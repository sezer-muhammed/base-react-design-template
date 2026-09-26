import { SearchFilterHeader, FilterButton } from "base-react-design-template";

export function Default() {
  return (
    <div style={{ width: 640 }}>
      <SearchFilterHeader
        query=""
        onQueryChange={() => {}}
        placeholder="Search deployments..."
      >
        <FilterButton active onClick={() => {}}>
          All
        </FilterButton>
        <FilterButton onClick={() => {}}>Ready</FilterButton>
        <FilterButton onClick={() => {}}>Building</FilterButton>
        <FilterButton onClick={() => {}}>Error</FilterButton>
      </SearchFilterHeader>
    </div>
  );
}

export function WithQuery() {
  return (
    <div style={{ width: 640 }}>
      <SearchFilterHeader
        query="api-gateway"
        onQueryChange={() => {}}
        placeholder="Search deployments..."
      >
        <FilterButton onClick={() => {}}>All</FilterButton>
        <FilterButton active onClick={() => {}}>
          Ready
        </FilterButton>
        <FilterButton onClick={() => {}}>Building</FilterButton>
        <FilterButton onClick={() => {}}>Error</FilterButton>
      </SearchFilterHeader>
    </div>
  );
}
