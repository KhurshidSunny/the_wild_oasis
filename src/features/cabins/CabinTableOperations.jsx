import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
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
      </TableOperations>
    </div>
  );
}

export default CabinTableOperations;
