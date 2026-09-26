"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CompanyLogo } from "@/components/ui/company-logo";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { ProgressCell } from "@/components/ui/progress-cell";
import { SearchInput } from "@/components/ui/search-input";
import { StatusSignal } from "@/components/ui/status-signal";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { PreferenceRow, Segmented, Toggle } from "@/components/ui/toggle";
import { text } from "@/components/ui/typography";
import { CATEGORICAL_PALETTE } from "@/lib/chart-theme";
import { getScoreColor, getScoreGrade } from "@/lib/score-colors";

const typeScale: { key: keyof typeof text; sample: string }[] = [
  { key: "display", sample: "Display" },
  { key: "pageTitle", sample: "Page title" },
  { key: "bandTitle", sample: "Band title" },
  { key: "sectionTitle", sample: "Section title" },
  { key: "lead", sample: "Lead paragraph copy for intros." },
  { key: "body", sample: "Body copy for dense reading surfaces." },
  { key: "small", sample: "Small supporting copy." },
  { key: "caption", sample: "Caption / helper text." },
  { key: "eyebrow", sample: "Eyebrow label" },
  { key: "meta", sample: "meta / mono" },
];

const scoreSamples = [42, 63, 81, 95];

export function PrimitivesShowcase() {
  const [notify, setNotify] = useState(true);
  const [compact, setCompact] = useState(false);
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [page, setPage] = useState(3);

  return (
    <div className="grid gap-3">
      <div className="grid gap-3 xl:grid-cols-2">
        <Surface
          className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
          id="prim-controls"
          tone="flat"
        >
          <SectionHeader
            eyebrow="Toggle · Segmented · PreferenceRow"
            summary="Switches, settings rows, and a segmented control for small enumerations."
            title="Form controls"
          />
          <div className="p-4">
            <PreferenceRow
              control={<Toggle checked={notify} label="Notifications" onChange={setNotify} />}
              hint="Send an email when a run finishes."
              title="Run notifications"
            />
            <PreferenceRow
              control={<Toggle checked={compact} label="Compact density" onChange={setCompact} />}
              hint="Tighten row heights across tables."
              title="Compact density"
            />
            <PreferenceRow
              control={
                <Segmented
                  onChange={setTheme}
                  options={[
                    { label: "System", value: "system" },
                    { label: "Light", value: "light" },
                    { label: "Dark", value: "dark" },
                  ]}
                  value={theme}
                />
              }
              hint="Override the OS color scheme."
              title="Theme"
            />
          </div>
        </Surface>

        <Surface
          className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
          id="prim-search"
          tone="flat"
        >
          <SectionHeader
            eyebrow="SearchInput"
            summary="Icon-left search box with a submit button. Controlled or uncontrolled."
            title="Search"
          />
          <div className="space-y-3 p-4">
            <SearchInput placeholder="Search records..." />
            <p className="text-[12px] leading-5 text-[var(--ds-gray-700)]">
              Transport-agnostic: wire <code className="font-mono">onSubmit</code> to a router push
              or <code className="font-mono">onChange</code> to a live filter.
            </p>
          </div>
        </Surface>
      </div>

      <Surface
        className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
        id="prim-typography"
        tone="flat"
      >
        <SectionHeader
          eyebrow="Typography"
          summary="The central type scale exported from components/ui/typography.ts as class strings."
          title="Type scale"
        />
        <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
          {typeScale.map((row) => (
            <div
              className="grid items-baseline gap-2 px-4 py-3 sm:grid-cols-[120px_1fr]"
              key={row.key}
            >
              <code className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                {row.key}
              </code>
              <span className={text[row.key]}>{row.sample}</span>
            </div>
          ))}
        </div>
      </Surface>

      <div className="grid gap-3 xl:grid-cols-[1fr_360px]">
        <Surface
          className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
          id="prim-scores"
          tone="flat"
        >
          <SectionHeader
            eyebrow="score-colors · ProgressCell"
            summary="Color rides on the signal dot (RED→AMBER→GREEN); the grade, bar, and number stay neutral."
            title="Score signals"
          />
          <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
            {scoreSamples.map((score) => (
              <div className="flex items-center gap-3 px-4 py-3" key={score}>
                <StatusSignal color={getScoreColor(score)} variant="dot" />
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] font-mono text-[13px] font-semibold text-[var(--ds-gray-1000)]">
                  {getScoreGrade(score)}
                </span>
                <ProgressCell color="var(--ds-gray-1000)" showValue value={score} />
              </div>
            ))}
          </div>
        </Surface>

        <Surface
          className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
          id="prim-chart"
          tone="flat"
        >
          <SectionHeader
            eyebrow="chart-theme"
            summary="Categorical palette for multi-series charts."
            title="Chart palette"
          />
          <div className="flex flex-wrap gap-2 p-4">
            {CATEGORICAL_PALETTE.map((color, index) => (
              <span
                className="h-8 w-8 rounded-[6px] border border-[var(--ds-gray-alpha-400)]"
                key={color}
                style={{ background: color }}
                title={`categorical(${index})`}
              />
            ))}
          </div>
        </Surface>
      </div>

      <Surface
        className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
        id="prim-logo"
        tone="flat"
      >
        <SectionHeader
          eyebrow="CompanyLogo"
          summary="Logo avatar with an initials fallback (shown here without a resolver)."
          title="Logo avatar"
        />
        <div className="flex flex-wrap items-center gap-3 p-4">
          {["Acme", "Globex", "Initech", "Umbrella", "Hooli"].map((name) => (
            <span className="flex items-center gap-2" key={name}>
              <CompanyLogo name={name} size={32} />
              <span className="text-[13px] text-[var(--ds-gray-900)]">{name}</span>
            </span>
          ))}
        </div>
      </Surface>

      <Surface
        className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
        id="prim-states"
        tone="flat"
      >
        <SectionHeader
          eyebrow="EmptyState"
          summary="Empty, error, and loading placeholders for content regions."
          title="State placeholders"
        />
        <div className="grid gap-3 p-4 lg:grid-cols-3">
          <EmptyState
            action={
              <Button size="sm" type="button" variant="secondary">
                Clear filters
              </Button>
            }
            body="Try adjusting your filters to find what you're looking for."
            title="No results"
            variant="empty"
          />
          <EmptyState
            body="We couldn't load this data. Please try again."
            title="Something went wrong"
            variant="error"
          />
          <EmptyState body="Fetching the latest records…" title="Loading" variant="loading" />
        </div>
      </Surface>

      <Surface
        className="overflow-hidden scroll-mt-[var(--showroom-scroll-mt)]"
        id="prim-pagination"
        tone="flat"
      >
        <SectionHeader
          eyebrow="Pagination"
          summary="Windowed page numbers with a mobile prev/next fallback."
          title="Pagination"
        />
        <div className="p-4">
          <Pagination currentPage={page} limit={20} onPageChange={setPage} total={420} />
        </div>
      </Surface>
    </div>
  );
}
