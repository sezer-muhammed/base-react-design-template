import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ComponentDocPreview } from "@/components/docs/component-doc-preview";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataPanel } from "@/components/ui/data-panel";
import { StatusSignal } from "@/components/ui/status-signal";
import { Surface } from "@/components/ui/surface";
import { componentDocs, getComponentDoc } from "@/data/component-docs";

export function ComponentsIndex() {
  const groups = componentDocs.reduce<Record<string, typeof componentDocs[number][]>>((result, component) => {
    result[component.category] ??= [];
    result[component.category].push(component);
    return result;
  }, {});

  return (
    <SiteShell>
      <div className="w-full space-y-8 px-3 py-5 sm:px-5 lg:px-8 2xl:px-10">
        <header className="grid gap-5 border-b border-[var(--ds-gray-alpha-300)] pb-7 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Component docs / {componentDocs.length} entries</p>
            <h1 className="mt-3 max-w-3xl text-[42px] font-semibold leading-[1.04] sm:text-[54px]">The pieces that make the product surface.</h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ds-gray-900)]">Every reusable primitive gets one focused page with a live preview, API notes, usage guidance, and a direct source reference. Composed screens live in Examples.</p>
          </div>
          <Surface className="p-4" tone="sunken">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">How to read this catalog</p>
            <div className="mt-3 grid gap-2 text-[13px] leading-5 text-[var(--ds-gray-900)]">
              <p><StatusSignal color="var(--ds-green-700)" variant="inline">Preview</StatusSignal> Interactive states are safe to try.</p>
              <p><StatusSignal color="var(--ds-blue-700)" variant="inline">Source</StatusSignal> The implementation stays close by.</p>
              <p><StatusSignal color="var(--ds-amber-700)" variant="inline">Usage</StatusSignal> Guidance explains the design intent.</p>
            </div>
          </Surface>
        </header>

        <div className="grid gap-8">
          {Object.entries(groups).map(([category, items]) => (
            <section key={category}>
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Catalog section</p>
                  <h2 className="mt-1 text-[24px] font-semibold">{category}</h2>
                </div>
                <Badge tone="gray">{items.length} components</Badge>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {items.map((component) => (
                  <Link className="group" href={`/components/${component.slug}`} key={component.slug}>
                    <Card className="h-full transition group-hover:-translate-y-0.5 group-focus-visible:shadow-[var(--ds-focus-ring)]" depth="base">
                      <CardHeader action={<StatusSignal color={component.color} variant="dot" />}>
                        <p className="font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">{component.slug}</p>
                        <CardTitle className="mt-2">{component.name}</CardTitle>
                        <CardDescription>{component.description}</CardDescription>
                      </CardHeader>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--ds-gray-700)]">
                        <Code2 aria-hidden="true" className="h-3.5 w-3.5" />
                        View documentation <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

export function ComponentDocPage({ slug }: { slug: string }) {
  const component = getComponentDoc(slug);

  if (!component) {
    return null;
  }

  const index = componentDocs.findIndex((item) => item.slug === component.slug);
  const previous = componentDocs[index - 1];
  const next = componentDocs[index + 1];

  return (
    <SiteShell>
      <div className="w-full space-y-6 px-3 py-5 sm:px-5 lg:px-8 2xl:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link className="inline-flex items-center gap-2 font-mono text-[11px] uppercase text-[var(--ds-gray-700)] hover:text-[var(--ds-gray-1000)]" href="/components/docs">
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> Back to component docs
          </Link>
          <div className="flex items-center gap-2"><Badge tone="gray">{component.category}</Badge><StatusSignal color={component.color} variant="pill">documented</StatusSignal></div>
        </div>

        <header className="grid gap-5 border-b border-[var(--ds-gray-alpha-300)] pb-7 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Component / {component.slug}</p>
            <h1 className="mt-3 text-[42px] font-semibold leading-[1.04] sm:text-[54px]">{component.name}</h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ds-gray-900)]">{component.description}</p>
          </div>
          <Surface className="p-4" tone="sunken">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Implementation</p>
            <code className="mt-2 block break-all text-[12px] leading-5 text-[var(--ds-gray-900)]">{component.source}</code>
            <a className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--ds-gray-1000)] underline decoration-[var(--ds-gray-alpha-500)] underline-offset-4" href={`https://github.com/sezer-muhammed/base-react-design-template/blob/main/${component.source}`} rel="noreferrer" target="_blank">
              Open source reference <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </Surface>
        </header>

        <DataPanel action={<StatusSignal color="var(--ds-green-700)" variant="pill">interactive</StatusSignal>} eyebrow="Live preview" summary="This preview uses the actual shared primitive and keeps its surrounding surface intentionally quiet." title={`${component.name} in context`}>
          <div className="p-4 sm:p-6"><ComponentDocPreview kind={component.preview} /></div>
        </DataPanel>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
          <DataPanel eyebrow="Guidance" title="Use this component with intent">
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <div><p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">When to use</p><p className="mt-2 text-[14px] leading-6 text-[var(--ds-gray-900)]">{component.whenToUse}</p></div>
              <div><p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Usage note</p><p className="mt-2 text-[14px] leading-6 text-[var(--ds-gray-900)]">{component.usage}</p></div>
            </div>
          </DataPanel>
          <DataPanel eyebrow="API surface" title="Primary props">
            <div className="grid gap-2 p-4">{component.api.map((item) => <code className="rounded-[6px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-2.5 py-2 text-[12px] text-[var(--ds-gray-900)]" key={item}>{item}</code>)}</div>
          </DataPanel>
        </div>

        <nav aria-label="Component documentation pagination" className="grid gap-3 border-t border-[var(--ds-gray-alpha-300)] pt-5 sm:grid-cols-2">
          {previous ? <ButtonLink className="justify-start" href={`/components/${previous.slug}`} icon={ArrowLeft} variant="secondary"><span className="text-left"><span className="block font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">Previous</span><span>{previous.name}</span></span></ButtonLink> : <span />}
          {next ? <ButtonLink className="justify-end" href={`/components/${next.slug}`} icon={ArrowRight} variant="secondary"><span className="text-right"><span className="block font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">Next</span><span>{next.name}</span></span></ButtonLink> : <span />}
        </nav>
      </div>
    </SiteShell>
  );
}
