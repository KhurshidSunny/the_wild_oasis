import { axiosInstance } from "../../axios";

// Get all cabins
export async function getCabins() {
  try {
    const { data } = await axiosInstance.get("/cabins");
    // console.log(data.data)
    return data.data;
  } catch (err) {
    throw new Error("The cabins could not be loaded");
  }
}

// Create or update cabin (with optional image)
export async function createEditCabin(newCabin, id) {
  try {
    const formData = new FormData();
    formData.append("name", newCabin.name);
    formData.append("description", newCabin.description);
    formData.append("maxCapacity", newCabin.maxCapacity);
    formData.append("regularPrice", newCabin.regularPrice);
    formData.append("discount", newCabin.discount);
    formData.append("image", newCabin.image);

    if (id) {
      // Update
      const { data } = await axiosInstance.patch(
        `/cabins/${id}`,
        formData
      );
      return data;
    } else {
      // Create
      const { data } = await axiosInstance.post("/cabins", formData);
      return data;
    }
  } catch (err) {
    throw new Error("The Cabin could not be created or updated");
  }
}

// Delete a cabin
export async function deleteCabin(id) {
  try {
    const { data } = await axiosInstance.delete(`/cabins/${id}`);
    return data;
  } catch (error) {
    throw new Error("The cabin could not be deleted");
  }
}
