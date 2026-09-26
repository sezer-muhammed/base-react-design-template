import type { Metadata } from "next";
import { ExamplesIndex } from "@/components/examples/example-pages";

export const metadata: Metadata = {
  title: "Examples",
  description: "Composed product surfaces built from the App Factory Base primitives.",
};

export default function Page() {
  return <ExamplesIndex />;
}
