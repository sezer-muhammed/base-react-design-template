import { RecordTable, Badge } from "base-react-design-template";
import type { RecordTableColumn } from "base-react-design-template";

type Member = {
  email: string;
  name: string;
  role: string;
  status: "Active" | "Invited";
  lastActive: string;
};

const memberColumns: readonly RecordTableColumn<Member>[] = [
  {
    key: "name",
    header: "Member",
    render: (row) => (
      <div>
        <div style={{ fontWeight: 500 }}>{row.name}</div>
        <div style={{ fontSize: 12, color: "var(--ds-gray-700)" }}>{row.email}</div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (row) => row.role,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge tone={row.status === "Active" ? "green" : "amber"}>{row.status}</Badge>
    ),
  },
  {
    key: "lastActive",
    header: "Last active",
    align: "right",
    render: (row) => row.lastActive,
  },
];

const members: readonly Member[] = [
  {
    email: "amara.okeke@northwind.io",
    name: "Amara Okeke",
    role: "Owner",
    status: "Active",
    lastActive: "2 min ago",
  },
  {
    email: "leon.fischer@northwind.io",
    name: "Leon Fischer",
    role: "Engineering Lead",
    status: "Active",
    lastActive: "1 h ago",
  },
  {
    email: "priya.nair@northwind.io",
    name: "Priya Nair",
    role: "Designer",
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    email: "noah.bergstrom@northwind.io",
    name: "Noah Bergström",
    role: "Analyst",
    status: "Invited",
    lastActive: "Pending",
  },
];

type Invoice = {
  number: string;
  client: string;
  amount: string;
  state: "Paid" | "Overdue";
};

const invoiceColumns: readonly RecordTableColumn<Invoice>[] = [
  {
    key: "number",
    header: "Invoice",
    render: (row) => (
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12 }}>
        {row.number}
      </span>
    ),
  },
  {
    key: "client",
    header: "Client",
    render: (row) => row.client,
  },
  {
    key: "state",
    header: "State",
    render: (row) => (
      <Badge tone={row.state === "Paid" ? "green" : "amber"}>{row.state}</Badge>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => row.amount,
  },
];

const invoices: readonly Invoice[] = [
  { number: "INV-2041", client: "Atlas Logistics", amount: "$4,820.00", state: "Paid" },
  { number: "INV-2042", client: "Harbor Foods", amount: "$1,240.50", state: "Overdue" },
  { number: "INV-2043", client: "Vela Studios", amount: "$9,600.00", state: "Paid" },
];

export function Default() {
  return (
    <div style={{ width: 720 }}>
      <RecordTable
        columns={memberColumns}
        getRowId={(row) => row.email}
        rows={members}
      />
    </div>
  );
}

export function Interactive() {
  return (
    <div style={{ width: 720 }}>
      <RecordTable
        columns={invoiceColumns}
        getRowId={(row) => row.number}
        onRowClick={() => {}}
        rows={invoices}
      />
    </div>
  );
}

export function Fitted() {
  return (
    <div style={{ width: 720 }}>
      <RecordTable
        columns={invoiceColumns}
        fit
        getRowId={(row) => row.number}
        rows={invoices}
      />
    </div>
  );
}
