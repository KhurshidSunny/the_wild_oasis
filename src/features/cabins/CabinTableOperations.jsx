/* eslint-disable react/no-unknown-property */
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/sortBy";
function CabinTableOperations() {
  return (
    <div>
      <TableOperations>
        <Filter
          fieldName="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No-discount" },
            { value: "with-discount", label: "With-discount" },
          ]}
        />

        <SortBy
          options={[
            { value: "name-asc", label: "Sort by name (A-Z)" },
            { value: "name-desc", label: "Sort by name (Z-A)" },
            { value: "regularPrice-asc", label: "Sort by price (low first)" },
            { value: "regularPrice-desc", label: "Sort by Price (high first)" },
            { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
            {
              value: "maxCapacity-desc",
              label: "Sort by capacity (high first)",
            },
          ]}
        />
      </TableOperations>
    </div>
  );
}

export default CabinTableOperations;
