"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Command, Search, X } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import { StatusSignal } from "@/components/ui/status-signal";
import {
  componentRegistry,
  type ComponentRegistryItem,
} from "@/data/component-registry";
import { commandPaletteOpenEvent } from "@/config/events";
import { cn } from "@/lib/cn";

const MAX_RESULTS = 12;
const pendingTargetKey = "base-template-command-target";

type PendingTarget = {
  anchor: string;
  id: string;
};

export function ComponentCommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => getResults(query), [query]);
  const selectedItem = results[activeIndex] ?? results[0];

  useEffect(() => {
    function onOpenCommandPalette() {
      setOpen(true);
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      const key = event.key.toLowerCase();

      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    window.addEventListener(commandPaletteOpenEvent, onOpenCommandPalette);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener(commandPaletteOpenEvent, onOpenCommandPalette);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    window.setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  useEffect(() => {
    const pendingTarget = readPendingTarget();

    if (!pendingTarget) {
      return;
    }

    window.setTimeout(() => {
      focusRegisteredTarget(pendingTarget);
      sessionStorage.removeItem(pendingTargetKey);
    }, 140);
  }, [pathname]);

  function openItem(item: ComponentRegistryItem) {
    const url = new URL(item.href, window.location.origin);
    const pendingTarget = {
      anchor: url.hash.replace("#", ""),
      id: item.id,
    };

    sessionStorage.setItem(pendingTargetKey, JSON.stringify(pendingTarget));
    setOpen(false);

    if (url.pathname === window.location.pathname) {
      window.history.pushState(null, "", item.href);
      window.setTimeout(() => {
        focusRegisteredTarget(pendingTarget);
        sessionStorage.removeItem(pendingTargetKey);
      }, 40);
      return;
    }

    router.push(item.href);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((value) => (value + 1) % Math.max(results.length, 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((value) =>
        value === 0 ? Math.max(results.length - 1, 0) : value - 1,
      );
    }

    if (event.key === "Enter" && selectedItem) {
      event.preventDefault();
      openItem(selectedItem);
    }
  }

  return (
    <>
      <button
        aria-label="Open component command palette"
        className="depth-surface fixed bottom-3 right-3 z-30 hidden h-9 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2.5 text-[12px] font-medium text-[var(--ds-gray-1000)] transition hover:bg-[var(--ds-gray-100)] md:inline-flex"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Command aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
        <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">Ctrl K</span>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]" />
          <Dialog.Content className="depth-surface fixed left-1/2 top-[10vh] z-50 w-[min(760px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
            <Dialog.Title className="sr-only">Component command palette</Dialog.Title>
            <div className="flex items-center gap-3 border-b border-[var(--ds-gray-alpha-400)] px-3 py-3">
              <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--ds-gray-700)]" />
              <input
                aria-activedescendant={selectedItem ? `command-result-${selectedItem.id}` : undefined}
                aria-controls="component-command-results"
                aria-label="Search registered components"
                className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[var(--ds-gray-700)]"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search component id, name, section..."
                ref={inputRef}
                value={query}
              />
              <kbd className="hidden h-6 items-center rounded-[5px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 font-mono text-[10px] text-[var(--ds-gray-700)] sm:inline-flex">
                Enter
              </kbd>
              <Dialog.Close className="rounded-[5px] p-1 text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)]">
                <X aria-hidden="true" className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div
              className="max-h-[min(640px,70vh)] overflow-y-auto p-2"
              id="component-command-results"
              role="listbox"
            >
              {results.length ? (
                results.map((item, index) => (
                  <button
                    aria-selected={index === activeIndex}
                    className={cn(
                      "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[7px] border px-3 py-2.5 text-left transition",
                      index === activeIndex
                        ? "border-[var(--ds-gray-1000)] bg-[var(--ds-gray-100)]"
                        : "border-transparent hover:bg-[var(--ds-gray-100)]",
                    )}
                    id={`command-result-${item.id}`}
                    key={item.id}
                    onClick={() => openItem(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    role="option"
                    type="button"
                  >
                    <span className="min-w-0">
                      <span className="flex min-w-0 flex-wrap items-center gap-2">
                        <StatusSignal color={item.color} variant="dot" />
                        <span className="truncate text-[14px] font-semibold">
                          {item.name}
                        </span>
                        <span className="inline-flex h-6 items-center rounded-[5px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-800)]">
                          {item.id}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-[12px] leading-5 text-[var(--ds-gray-800)]">
                        {item.description}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="hidden font-mono text-[11px] uppercase text-[var(--ds-gray-700)] sm:inline">
                        {item.section}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-[var(--ds-gray-700)]"
                      />
                    </span>
                  </button>
                ))
              ) : (
                <div className="grid min-h-32 place-items-center rounded-[7px] border border-dashed border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] text-center">
                  <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                    No registered component
                  </p>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function getResults(query: string) {
  const needle = normalize(query);

  if (!needle) {
    return componentRegistry.slice(0, MAX_RESULTS);
  }

  return componentRegistry
    .map((item) => ({
      item,
      score: scoreItem(item, needle),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id))
    .slice(0, MAX_RESULTS)
    .map((result) => result.item);
}

function scoreItem(item: ComponentRegistryItem, needle: string) {
  const id = normalize(item.id);
  const name = normalize(item.name);
  const section = normalize(item.section);
  const text = normalize(
    `${item.id} ${item.name} ${item.section} ${item.description} ${(item.aliases ?? []).join(" ")}`,
  );

  if (id === needle) {
    return 100;
  }

  if (id.startsWith(needle)) {
    return 80;
  }

  if (name.startsWith(needle)) {
    return 60;
  }

  if (section.startsWith(needle)) {
    return 40;
  }

  if (text.includes(needle)) {
    return 20;
  }

  return 0;
}

function focusRegisteredTarget(target: PendingTarget) {
  const element =
    document.getElementById(target.anchor) ??
    document.querySelector<HTMLElement>(`[data-component-id="${target.id}"]`);

  if (!element) {
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - 96;
  const nextTop = Math.max(top, 0);

  window.scrollTo({ top: nextTop });
  document.documentElement.scrollTop = nextTop;
  document.body.scrollTop = nextTop;
  pulseElement(element);
}

function pulseElement(element: HTMLElement) {
  const previousTransition = element.style.transition;
  const previousBoxShadow = element.style.boxShadow;
  const previousOutline = element.style.outline;
  const previousOutlineOffset = element.style.outlineOffset;

  element.style.transition = "box-shadow 180ms ease, outline-color 180ms ease";
  element.style.boxShadow =
    "0 0 0 3px color-mix(in srgb, var(--ds-blue-700) 28%, transparent), 0 22px 50px -34px rgb(0 0 0 / 0.65)";
  element.style.outline = "1px solid var(--ds-blue-700)";
  element.style.outlineOffset = "2px";

  window.setTimeout(() => {
    element.style.transition = previousTransition;
    element.style.boxShadow = previousBoxShadow;
    element.style.outline = previousOutline;
    element.style.outlineOffset = previousOutlineOffset;
  }, 1800);
}

function readPendingTarget(): PendingTarget | null {
  const value = sessionStorage.getItem(pendingTargetKey);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as PendingTarget;
  } catch {
    sessionStorage.removeItem(pendingTargetKey);
    return null;
  }
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}
