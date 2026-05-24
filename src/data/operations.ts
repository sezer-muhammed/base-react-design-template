import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";

export const capabilityAreas = [
  "API contract design and typed response envelopes",
  "Webhook intake, signing, and idempotency handling",
  "Scheduled pull jobs with cursor-based synchronization",
  "Realtime event feeds with SSE or WebSocket channels",
  "Queue-backed workflow orchestration",
  "Admin settings and environment-aware feature flags",
  "Transport adapter slots for HTTP, TCP, and UDP",
  "Observability, audit logs, and replayable event history",
  "Role-aware navigation and permission boundaries",
  "Data table schemas for dense operational records",
  "Theme token governance and surface depth rules",
  "Deployment, preview, and release handoff workflows",
];

export type OperationRow = {
  id: string;
  cohort: string;
  lead: string;
  module: string;
  readiness: number;
  risk: "Low" | "Medium" | "High";
  status: "Active" | "Draft" | "Done";
};

export const operationRows: OperationRow[] = [
  {
    id: "tpl-001",
    module: "Webhook Intake Pipeline",
    cohort: "Events / Push",
    lead: "Core Team",
    readiness: 92,
    risk: "Low",
    status: "Active",
  },
  {
    id: "tpl-002",
    module: "Pull Sync Scheduler",
    cohort: "Jobs / Pull",
    lead: "Ops Team",
    readiness: 74,
    risk: "Medium",
    status: "Active",
  },
  {
    id: "tpl-003",
    module: "Transport Adapter Layer",
    cohort: "TCP / UDP",
    lead: "Platform",
    readiness: 63,
    risk: "High",
    status: "Draft",
  },
  {
    id: "tpl-004",
    module: "API Response Contracts",
    cohort: "REST / RPC",
    lead: "Backend",
    readiness: 88,
    risk: "Low",
    status: "Active",
  },
  {
    id: "tpl-005",
    module: "Realtime Stream Console",
    cohort: "SSE / WebSocket",
    lead: "Frontend",
    readiness: 81,
    risk: "Medium",
    status: "Done",
  },
  {
    id: "tpl-006",
    module: "Feature Flag Registry",
    cohort: "Config",
    lead: "Product",
    readiness: 57,
    risk: "Medium",
    status: "Draft",
  },
  {
    id: "tpl-007",
    module: "Audit Trail Viewer",
    cohort: "Security",
    lead: "Governance",
    readiness: 69,
    risk: "Low",
    status: "Active",
  },
  {
    id: "tpl-008",
    module: "Queue Retry Policy",
    cohort: "Workers",
    lead: "Reliability",
    readiness: 44,
    risk: "High",
    status: "Draft",
  },
  {
    id: "tpl-009",
    module: "Permission-Aware Navigation",
    cohort: "Auth / UX",
    lead: "Design Systems",
    readiness: 76,
    risk: "Medium",
    status: "Active",
  },
  {
    id: "tpl-010",
    module: "Operational Data Table",
    cohort: "Analytics",
    lead: "Data Team",
    readiness: 95,
    risk: "Low",
    status: "Done",
  },
  {
    id: "tpl-011",
    module: "Release Preview Checklist",
    cohort: "Deployment",
    lead: "Delivery",
    readiness: 51,
    risk: "High",
    status: "Draft",
  },
  {
    id: "tpl-012",
    module: "Theme Token Registry",
    cohort: "Foundation",
    lead: "UI Platform",
    readiness: 84,
    risk: "Medium",
    status: "Active",
  },
];

export const roadmapTree: RecursiveMenuItem[] = [
  {
    label: "Template System",
    meta: "root",
    status: "active",
    children: [
      {
        label: "Application Shell",
        meta: "layout",
        status: "ready",
        children: [
          { label: "Header", meta: "sticky", status: "ready" },
          { label: "Section nav", meta: "scrollspy", status: "active" },
          { label: "Footer", meta: "metadata", status: "ready" },
        ],
      },
      {
        label: "Runtime Surfaces",
        meta: "platform",
        status: "active",
        children: [
          { label: "API handlers", meta: "HTTP", status: "ready" },
          { label: "Push inbox", meta: "webhooks", status: "active" },
          { label: "Pull jobs", meta: "scheduler", status: "draft" },
        ],
      },
      {
        label: "Transport Layer",
        meta: "future",
        status: "draft",
        children: [
          { label: "SSE / WebSocket", meta: "realtime", status: "ready" },
          { label: "TCP adapter", meta: "socket", status: "draft" },
          { label: "UDP adapter", meta: "datagram", status: "draft" },
        ],
      },
    ],
  },
];
