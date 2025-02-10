# Tiptap Slash Command Extension for React.js

Simple tiptap extension for React to add notion like slash command to your project. It provides a flexible extension built on top of tiptap suggestion extension, and headless UI components built on cmdk package.

- Works with both useEditor hook and EditorProvider
- Type Safe
- Headless UI on top of cmdk
- Flexible and easy to use

Notes:
1. Make sure to wrap your entire editor in a `SlashCmdProvider` component.
2. for keyboard navigation, provide `enableKeyboardNavigationc` in `editorProps` handleDOMEvents.

## Installation

Installing the package using pnpm

```bash
  pnpm add @harshtalks/slash-tiptap
```

## Usage:


1. Define suggestions. Add all the commands you want in the slash menu.
```ts
import { enableKeyboardNavigation } from "@harshtalks/slash-tiptap";

const suggestions = createSuggestionsItems([
  {
    title: "text",
    searchTerms: ["paragraph"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "Bullet List",
    searchTerms: ["unordered", "point"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Ordered List",
    searchTerms: ["ordered", "point", "numbers"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
]);
```

2. Create an editor instance
```tsx
import {
  Slash,
  enableKeyboardNavigation,
} from "@harshtalks/slash-tiptap";


const editor = useEditor({
  extensions: [
    StarterKit,
    ImageExtension,
    Slash.configure({
      suggestion: {
        items: () => suggestions,
      },
    }),
    Placeholder.configure({
      // Use a placeholder:
      placeholder: "Press / to see available commands",
      // Use different placeholders depending on the node type:
      // placeholder: ({ node }) => {
      //   if (node.type.name === 'heading') {
      //     return 'What’s the title?'
      //   }

      //   return 'Can you add some further context?'
      // },
    }),
  ],
  editorProps: {
    handleDOMEvents: {
      keydown: (_, v) => enableKeyboardNavigation(v),
    },
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
    },
  },
  content: `
     <p>This is a basic example of usage. Press / to see available commands. Click on Image to resize and align.</p>
     <img src="https://placehold.co/800x400/6A00F5/white" />
   `,
});
```

3. Wrap your editor in `SlashCmdProvider` component and add `SlashCmd` component to your editor.
```tsx
import {
  SlashCmd
} from "@harshtalks/slash-tiptap";


export const Editor = () => {
  return (
  <SlashCmdProvider>
    <EditorContent editor={editor} />
    <SlashCmd.Root editor={editor}>
      <SlashCmd.Cmd>
        <SlashCmd.Empty>No commands available</SlashCmd.Empty>
        <SlashCmd.List>
          {suggestions.map((item) => {
            return (
              <SlashCmd.Item
                value={item.title}
                onCommand={(val) => {
                  item.command(val);
                }}
                key={item.title}
              >
                  <p>{item.title}</p>
              </SlashCmd.Item>
            );
          })}
        </SlashCmd.List>
      </SlashCmd.Cmd>
    </SlashCmd.Root>
  </SlashCmdProvider>
  );
}
