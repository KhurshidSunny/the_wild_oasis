/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom";
import Select from "./Select";

/* eslint-disable no-unused-vars */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={SortBy}
    />
  );
}

export default SortBy;
