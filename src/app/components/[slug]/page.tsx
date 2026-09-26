import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentDocPage } from "@/components/docs/component-doc-page";
import { componentDocs, getComponentDoc } from "@/data/component-docs";

export function generateStaticParams() {
  return componentDocs.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  return {
    title: component ? `${component.name} · Components` : "Component",
    description: component?.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getComponentDoc(slug)) {
    notFound();
  }

  return <ComponentDocPage slug={slug} />;
}
