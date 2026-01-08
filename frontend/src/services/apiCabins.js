import { axiosInstance } from "../../axios";
import { withTestDataFallback } from "../test-data/apiFallback";
import { testDataService } from "../test-data/testDataService";

// NOTE: All original backend API code is preserved below.
// The withTestDataFallback wrapper only activates when backend is unavailable.
// When backend is available, original API calls execute normally.

// Get all cabins
export async function getCabins() {
  return withTestDataFallback(
    async () => {
      const { data } = await axiosInstance.get("/cabins");
      return data.data;
    },
    () => testDataService.getCabins()
  );
}

// Create or update cabin (with optional image)
export async function createEditCabin(newCabin, id) {
  return withTestDataFallback(
    async () => {
      const formData = new FormData();
      formData.append("name", newCabin.name);
      formData.append("description", newCabin.description);
      formData.append("maxCapacity", newCabin.maxCapacity);
      formData.append("regularPrice", newCabin.regularPrice);
      formData.append("discount", newCabin.discount);
      formData.append("image", newCabin.image);

      if (id) {
        const { data } = await axiosInstance.patch(`/cabins/${id}`, formData);
        return data;
      } else {
        const res = await axiosInstance.post("/cabins", formData);
        return res;
      }
    },
    () => {
      // For test data, just return success (cabins are pre-loaded)
      return { status: "success", data: newCabin };
    }
  );
}

// Delete a cabin
// In demo mode, delete appears to work but data is preserved
export async function deleteCabin(id) {
  return withTestDataFallback(
    async () => {
      // Original backend API call - executes when backend is available
      const { data } = await axiosInstance.delete(`/cabins/${id}`);
      return data;
    },
    () => {
      // Test data fallback - safe mode enabled (doesn't actually delete)
      return testDataService.deleteCabin(id, true);
    }
  );
}
