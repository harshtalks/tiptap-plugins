import type { Alignment } from "./types";

// This will be used to calculate the alignment of the data in the table
export const alignmentVariants: Record<Alignment, string> = {
  center: `margin: 0 auto`,
  left: `margin-right: auto`,
  right: `margin-left: auto`,
};
