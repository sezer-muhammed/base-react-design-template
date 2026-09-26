import { FilterButton } from "base-react-design-template";

export function Default() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <FilterButton active onClick={() => {}}>
        All
      </FilterButton>
      <FilterButton onClick={() => {}}>Active</FilterButton>
      <FilterButton onClick={() => {}}>Archived</FilterButton>
    </div>
  );
}

export function MultiActive() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <FilterButton active onClick={() => {}}>
        Production
      </FilterButton>
      <FilterButton active onClick={() => {}}>
        Preview
      </FilterButton>
      <FilterButton onClick={() => {}}>Development</FilterButton>
    </div>
  );
}
