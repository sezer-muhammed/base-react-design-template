"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Command,
  Layers,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";

const alertRows = [
  ["ALERT-01", "Info", "Sistem notu, renkli zemin yerine küçük sinyal noktasıyla durur.", "var(--ds-blue-700)"],
  ["ALERT-02", "Saved", "Başarılı durumlar aynı yüzeyde kalır, sadece sinyal rengi değişir.", "var(--ds-green-700)"],
  ["ALERT-03", "Risk", "Kritik mesajlar bağırmadan fark edilir.", "var(--ds-pink-700)"],
] as const;

const graphRows = [
  ["Vision", 72, "var(--ds-blue-700)"],
  ["Empathy", 88, "var(--ds-teal-700)"],
  ["Risk", 54, "var(--ds-amber-700)"],
  ["Trust", 67, "var(--ds-purple-700)"],
] as const;

const badgeRows = [
  ["Retail", "var(--ds-gray-1000)"],
  ["Aktif", "var(--ds-blue-700)"],
  ["Tamam", "var(--ds-green-700)"],
  ["Orta Risk", "var(--ds-amber-700)"],
  ["Yüksek Risk", "var(--ds-pink-700)"],
  ["Muhakeme", "var(--ds-purple-700)"],
  ["Empati", "var(--ds-teal-700)"],
] as const;

export function ActionShowcase() {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Toast.Provider swipeDirection="right">
      <div className="grid items-start gap-3 xl:grid-cols-[1fr_360px]">
        <Surface
          className="p-4"
          data-component-id="ACTION-01"
          id="action-01-toolbar"
          tone="flat"
        >
          <div className="mb-3">
            <ComponentIdBadge id="ACTION-01" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button icon={BookOpen} variant="primary">
              Eğitimleri İncele
            </Button>
            <Button icon={ArrowUpRight} variant="secondary">
              Program Detayı
            </Button>
            <Button icon={Search} variant="ghost">
              Ara
            </Button>
            <Button icon={Menu} size="sm" variant="secondary">
              Menü
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {badgeRows.map(([label, color]) => (
              <DotBadge color={color} key={label}>
                {label}
              </DotBadge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <GlassPill>glass tag</GlassPill>
            <GlassPill>blur edge</GlassPill>
            <GlassPill>soft light</GlassPill>
          </div>
        </Surface>

        <Surface
          className="overflow-hidden self-start"
          data-component-id="ACTION-02"
          id="action-02-compact-toolbar"
          tone="flat"
        >
          <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-400)] px-3 py-2">
            <div className="flex items-center gap-2">
              <Command aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
              <span className="text-[13px] font-medium">Compact toolbar</span>
            </div>
            <div className="flex items-center gap-2">
              <ComponentIdBadge id="ACTION-02" />
              <Badge tone="gray">3 actions</Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[var(--ds-gray-alpha-300)]">
            {["Analiz", "Öncelik", "Yol"].map((item, index) => (
              <button
                className="flex h-20 flex-col items-center justify-center gap-2 text-[13px] font-medium hover:bg-[var(--ds-gray-100)]"
                key={item}
                type="button"
              >
                <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
                  0{index + 1}
                </span>
                {item}
              </button>
            ))}
          </div>
        </Surface>

        <div className="grid gap-3 lg:grid-cols-3 xl:col-span-2">
          {alertRows.map(([id, title, body, color]) => (
            <NeutralAlert body={body} color={color} id={id} key={id} title={title} />
          ))}
        </div>

        <Surface
          className="overflow-hidden xl:col-span-2"
          data-component-id="GRAPH-01"
          id="graph-01-signal-bars"
          tone="flat"
        >
          <div className="grid gap-4 p-4 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <ComponentIdBadge id="GRAPH-01" />
                <Badge tone="gray">bar alternative</Badge>
              </div>
              <h3 className="mt-4 text-[18px] font-semibold">Signal bars</h3>
              <p className="mt-1 max-w-xl text-[13px] leading-5 text-[var(--ds-gray-900)]">
                Simsiyah blok yerine ince ray, küçük renk sinyali ve daha açık veri ritmi.
              </p>
              <div className="mt-4 grid gap-3">
                {graphRows.map(([label, value, color]) => (
                  <div className="grid gap-2" key={label}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2 font-medium">
                        <ColorDot color={color} />
                        {label}
                      </span>
                      <span className="font-mono text-[var(--ds-gray-700)]">{value}%</span>
                    </div>
                    <div className="h-2 rounded-full border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-[2px]">
                      <div
                        className="h-full rounded-full bg-[var(--ds-gray-1000)] opacity-80"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card depth="flat" tone="muted">
              <CardHeader action={<Sparkles className="h-4 w-4 text-[var(--ds-gray-700)]" />}>
                <CardTitle>Badge rail</CardTitle>
                <CardDescription>
                  Aynı badge ailesi biraz daha süslü, ama hala tablo diliyle uyumlu.
                </CardDescription>
              </CardHeader>
              <div className="flex flex-wrap gap-2">
                <DotBadge color="var(--ds-blue-700)">AI Ready</DotBadge>
                <DotBadge color="var(--ds-green-700)">Governed</DotBadge>
                <DotBadge color="var(--ds-purple-700)">Judgment</DotBadge>
                <DotBadge color="var(--ds-amber-700)">Review</DotBadge>
                <GlassPill>glass</GlassPill>
              </div>
            </Card>
          </div>
        </Surface>

        <Surface
          className="p-4 xl:col-span-2"
          data-component-id="OVER-01"
          id="over-01-modal-toast"
          tone="flat"
        >
          <div className="flex flex-wrap items-center gap-2">
            <ComponentIdBadge id="OVER-01" />
            <DialogExample />
            <ComponentIdBadge id="OVER-02" />
            <Button icon={Bell} onClick={() => setToastOpen(true)} type="button">
              Toast göster
            </Button>
            <Badge tone="gray">Radix powered</Badge>
          </div>
        </Surface>
      </div>

      <Toast.Root
        className="depth-surface fixed bottom-4 right-4 z-50 w-[320px] rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3"
        data-component-id="OVER-02"
        duration={3000}
        onOpenChange={setToastOpen}
        open={toastOpen}
      >
        <div className="flex items-start gap-3">
          <ColorDot className="mt-2" color="var(--ds-green-700)" />
          <div className="min-w-0">
            <Toast.Title className="text-[13px] font-semibold">
              Component saved
            </Toast.Title>
            <Toast.Description className="mt-1 text-[12px] leading-5 text-[var(--ds-gray-900)]">
              Toast çalışıyor; yüzey neutral, sinyal küçük renk noktasıyla geliyor.
            </Toast.Description>
          </div>
          <Toast.Close className="ml-auto rounded-[5px] p-1 text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)]">
            <X aria-hidden="true" className="h-4 w-4" />
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

function DialogExample() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button data-component-id="OVER-01" icon={Layers} type="button" variant="primary">
          Modal aç
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35" />
        <Dialog.Content className="depth-surface fixed left-1/2 top-1/2 z-50 w-[min(420px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
          <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-400)] p-4">
            <Dialog.Title className="text-[16px] font-semibold">Modal</Dialog.Title>
            <Dialog.Close className="rounded-[5px] p-1 hover:bg-[var(--ds-gray-100)]">
              <X aria-hidden="true" className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="p-4 text-[13px] leading-5 text-[var(--ds-gray-900)]">
            Neutral modal yüzeyi. Renkli karar değil, net çerçeve ve kısa aksiyon.
          </Dialog.Description>
          <div className="flex justify-end gap-2 border-t border-[var(--ds-gray-alpha-300)] p-3">
            <Dialog.Close asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button type="button" variant="primary">Confirm</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NeutralAlert({
  body,
  color,
  id,
  title,
}: {
  body: string;
  color: string;
  id: string;
  title: string;
}) {
  return (
    <div
      className="rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.76),0_1px_1px_rgb(0_0_0_/_0.04)]"
      data-component-id={id}
      id={id.toLowerCase()}
    >
      <div className="flex items-start gap-2">
        <ColorDot className="mt-1.5" color={color} />
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
            <ComponentIdBadge id={id} />
            {title}
          </p>
          <p className="mt-1 text-[12px] leading-5 text-[var(--ds-gray-900)]">{body}</p>
        </div>
      </div>
    </div>
  );
}

function DotBadge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span className="inline-flex h-7 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2.5 text-[12px] font-medium text-[var(--ds-gray-1000)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.76),0_1px_1px_rgb(0_0_0_/_0.04)]">
      <ColorDot color={color} />
      {children}
    </span>
  );
}

function ColorDot({ className, color }: { className?: string; color: string }) {
  return (
    <span
      className={cn("h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--ds-gray-alpha-500)]", className)}
      style={{ background: color }}
    />
  );
}

function GlassPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-[7px] border border-white/35 bg-white/18 px-2.5 text-[12px] font-medium text-[var(--ds-gray-1000)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.85),inset_0_-1px_0_rgb(255_255_255_/_0.16),0_8px_18px_-16px_rgb(0_0_0_/_0.55)] backdrop-blur-md">
      {children}
    </span>
  );
}

function ComponentIdBadge({ id }: { id: string }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-[5px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-800)]"
      data-component-id={id}
    >
      {id}
    </span>
  );
}
