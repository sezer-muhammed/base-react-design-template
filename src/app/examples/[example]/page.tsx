import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamplePage } from "@/components/examples/example-pages";

const examples = ["dashboard", "admin", "realtime", "workflows"] as const;
type ExampleSlug = (typeof examples)[number];

export function generateStaticParams() {
  return examples.map((example) => ({ example }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ example: string }>;
}): Promise<Metadata> {
  const { example } = await params;
  return { title: example === "dashboard" ? "Dashboard example" : `${example[0]?.toUpperCase()}${example.slice(1)} example` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ example: string }>;
}) {
  const { example } = await params;

  if (!examples.includes(example as ExampleSlug)) {
    notFound();
  }

  return <ExamplePage kind={`/examples/${example}` as `/examples/${ExampleSlug}`} />;
}
