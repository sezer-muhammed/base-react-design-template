"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileArchive,
  FileText,
  ImageIcon,
  UploadCloud,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordTable, type RecordTableColumn } from "@/components/ui/record-table";
import { StatusSignal } from "@/components/ui/status-signal";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";

type UploadState = "Queued" | "Uploading" | "Complete" | "Blocked";

type UploadItem = {
  id: string;
  name: string;
  progress: number;
  size: number;
  state: UploadState;
  type: string;
};

type FileKind = "CSV" | "Image" | "Other" | "PDF" | "ZIP";

const seedUploads: UploadItem[] = [
  {
    id: "upload-001",
    name: "dashboard-cover.png",
    progress: 100,
    size: 820_000,
    state: "Complete",
    type: "image/png",
  },
  {
    id: "upload-002",
    name: "metrics-export.csv",
    progress: 64,
    size: 1_860_000,
    state: "Uploading",
    type: "text/csv",
  },
  {
    id: "upload-003",
    name: "site-assets.zip",
    progress: 0,
    size: 8_440_000,
    state: "Queued",
    type: "application/zip",
  },
  {
    id: "upload-004",
    name: "invoice-review.pdf",
    progress: 0,
    size: 640_000,
    state: "Queued",
    type: "application/pdf",
  },
];

const acceptedTypes: FileKind[] = ["Image", "CSV", "PDF", "ZIP"];
const maxSizeMb = 25;

export function FileUploadShowcase() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>(seedUploads);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setUploads((current) => {
        let activeSeen = false;
        let changed = false;

        const next = current.map((item): UploadItem => {
          if (item.state === "Blocked" || item.state === "Complete") {
            return item;
          }

          if (item.state === "Uploading") {
            activeSeen = true;
            const progress = Math.min(100, item.progress + 7);
            changed = changed || progress !== item.progress;

            return {
              ...item,
              progress,
              state: progress >= 100 ? "Complete" : "Uploading",
            };
          }

          if (!activeSeen && item.state === "Queued") {
            activeSeen = true;
            changed = true;

            return {
              ...item,
              progress: Math.max(18, item.progress),
              state: "Uploading",
            };
          }

          return item;
        });

        return changed ? next : current;
      });
    }, 420);

    return () => window.clearInterval(timer);
  }, []);

  const totalSize = useMemo(
    () => uploads.reduce((total, item) => total + item.size, 0),
    [uploads],
  );

  const completeCount = uploads.filter((item) => item.state === "Complete").length;
  const activeCount = uploads.filter((item) => item.state === "Uploading").length;
  const queuedCount = uploads.filter((item) => item.state === "Queued").length;

  function addFiles(files: FileList | File[]) {
    const nextUploads = Array.from(files).map((file, index): UploadItem => {
      const blocked = file.size > maxSizeMb * 1024 * 1024;

      return {
        id: `${file.name}-${file.lastModified}-${index}`,
        name: file.name,
        progress: blocked ? 0 : 12,
        size: file.size,
        state: blocked ? "Blocked" : "Queued",
        type: file.type || "application/octet-stream",
      };
    });

    setUploads((current) => [...nextUploads, ...current].slice(0, 8));
  }

  const removeUpload = useCallback((id: string) => {
    setUploads((current) => current.filter((item) => item.id !== id));
  }, []);

  const uploadColumns = useMemo<RecordTableColumn<UploadItem>[]>(
    () => [
      {
        header: "File",
        key: "file",
        render: (item) => <UploadFileCell item={item} />,
      },
      {
        className: "w-[112px]",
        header: "Type",
        key: "type",
        render: (item) => {
          const kind = getFileKind(item);

          return (
            <StatusSignal color={fileKindColor[kind]} variant="pill">
              {kind}
            </StatusSignal>
          );
        },
      },
      {
        className: "w-[118px]",
        header: "State",
        key: "state",
        render: (item) => (
          <StatusSignal color={getUploadStateColor(item.state)} variant="cell">
            {item.state}
          </StatusSignal>
        ),
      },
      {
        align: "right",
        className: "w-[152px]",
        header: "Progress",
        key: "progress",
        render: (item) => (
          <ProgressCell
            className="ml-auto"
            color={getUploadStateColor(item.state)}
            showValue
            value={item.progress}
          />
        ),
      },
      {
        align: "right",
        className: "w-[56px]",
        header: "",
        key: "action",
        render: (item) => (
          <RemoveUploadButton id={item.id} onRemove={removeUpload} />
        ),
      },
    ],
    [removeUpload],
  );

  return (
    <div>
      <Surface
        className="overflow-hidden"
        data-component-id="UPLOAD-01"
        id="upload-01-dropzone"
        tone="flat"
      >
        <SectionHeader
          action={
            <>
              <ComponentIdBadge id="UPLOAD-01" />
              <StatusSignal color="var(--ds-blue-700)" variant="pill">
                input + drag
              </StatusSignal>
            </>
          }
          eyebrow="File input"
          summary="A reusable dropzone for dashboards, profile media, small CMS flows, and data imports."
          title="Upload dropzone"
        />

        <div className="grid gap-3 p-3 lg:grid-cols-[minmax(300px,0.58fr)_minmax(560px,1.42fr)]">
          <label
            className={cn(
              "relative flex min-h-[250px] cursor-pointer flex-col justify-between overflow-hidden rounded-[8px] border p-3 outline-none transition focus-within:shadow-[var(--ds-focus-ring)]",
              dragActive
                ? "border-[var(--ds-blue-700)] bg-[var(--ds-blue-100)]"
                : "border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] hover:bg-[var(--ds-gray-100)]",
            )}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setDragActive(false);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setDragActive(false);
              addFiles(event.dataTransfer.files);
            }}
          >
            <input
              className="sr-only"
              multiple
              onChange={(event) => {
                if (event.target.files) {
                  addFiles(event.target.files);
                  event.target.value = "";
                }
              }}
              ref={inputRef}
              type="file"
            />

            <div>
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)]">
                  <UploadCloud aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-900)]" />
                </span>
                <span>
                  <span className="block text-[16px] font-semibold leading-6">
                    Drop files into the workspace
                  </span>
                  <span className="mt-1 block max-w-md text-[13px] leading-5 text-[var(--ds-gray-900)]">
                    Dashboard-friendly upload control with the same border rhythm,
                    chips, and compact action sizing as the rest of the template.
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {acceptedTypes.map((type) => (
                  <StatusSignal color={fileKindColor[type]} key={type} variant="pill">
                    {type}
                  </StatusSignal>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ds-gray-alpha-300)] pt-3">
                <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                  max {maxSizeMb}mb per file
                </span>
                <Button
                  icon={UploadCloud}
                  onClick={(event) => {
                    event.preventDefault();
                    inputRef.current?.click();
                  }}
                  size="sm"
                  type="button"
                  variant="primary"
                >
                  Browse
                </Button>
              </div>
            </div>
          </label>

          <div className="rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--ds-gray-alpha-300)] p-3">
              <div>
                <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                  Queue
                </p>
                <p className="mt-1 text-[14px] font-semibold">
                  {uploads.length} files / {formatBytes(totalSize)}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <StatusSignal color="var(--ds-green-700)" variant="pill">
                  {completeCount}/{uploads.length} complete
                </StatusSignal>
                <StatusSignal color="var(--ds-blue-700)" variant="pill">
                  {activeCount} active
                </StatusSignal>
                <StatusSignal color="var(--ds-gray-1000)" variant="pill">
                  {queuedCount} queued
                </StatusSignal>
                <Button
                  onClick={() => setUploads((current) => current.filter((item) => item.state !== "Complete"))}
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  Clear complete
                </Button>
              </div>
            </div>

            <RecordTable
              columns={uploadColumns}
              fit
              getRowId={(item) => item.id}
              rows={uploads}
            />
          </div>
        </div>
      </Surface>
    </div>
  );
}

function UploadFileCell({ item }: { item: UploadItem }) {
  const kind = getFileKind(item);
  const Icon = item.type.startsWith("image/")
    ? ImageIcon
    : item.type.includes("zip") || item.type.includes("archive")
      ? FileArchive
      : FileText;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
        <Icon
          aria-hidden="true"
          className="h-4 w-4"
          style={{ color: fileKindColor[kind] }}
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold">{item.name}</span>
        <span className="mt-0.5 flex flex-wrap items-center gap-2 text-[12px] text-[var(--ds-gray-700)]">
          <span>{formatBytes(item.size)}</span>
          {item.state === "Complete" ? (
            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 text-[var(--ds-green-700)]" />
          ) : null}
          {item.state === "Blocked" ? (
            <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5 text-[var(--ds-red-700)]" />
          ) : null}
        </span>
      </span>
    </div>
  );
}

function RemoveUploadButton({
  id,
  onRemove,
}: {
  id: string;
  onRemove: (id: string) => void;
}) {
  return (
    <button
      className="ml-auto grid h-8 w-8 place-items-center rounded-[6px] border border-[var(--ds-gray-alpha-300)] text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]"
      onClick={() => onRemove(id)}
      title="Remove file"
      type="button"
    >
      <X aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}

function getUploadStateColor(state: UploadState) {
  if (state === "Complete") return "var(--ds-green-700)";
  if (state === "Blocked") return "var(--ds-red-700)";
  if (state === "Uploading") return "var(--ds-blue-700)";
  return "var(--ds-gray-1000)";
}

const fileKindColor: Record<FileKind, string> = {
  CSV: "var(--ds-green-700)",
  Image: "var(--ds-blue-700)",
  Other: "var(--ds-gray-1000)",
  PDF: "var(--ds-red-700)",
  ZIP: "var(--ds-amber-700)",
};

function getFileKind(item: UploadItem): FileKind {
  const fileName = item.name.toLowerCase();
  const mimeType = item.type.toLowerCase();

  if (mimeType.startsWith("image/")) return "Image";
  if (mimeType.includes("csv") || fileName.endsWith(".csv")) return "CSV";
  if (mimeType.includes("pdf") || fileName.endsWith(".pdf")) return "PDF";
  if (
    mimeType.includes("zip") ||
    mimeType.includes("archive") ||
    fileName.endsWith(".zip")
  ) {
    return "ZIP";
  }

  return "Other";
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

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024)).toLocaleString("en-US")} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
