import { axiosInstance } from "../../axios";


// Get settings 
export async function getSettings() {
  try{
    const data = await axiosInstance.get('/settings');
    return data;

  }catch(err) {
    throw new Error('Could not get settings')
  }
}

// Create settings
export async function createSetting(newSetting) {
  try {
    const { data } = await axiosInstance.post("/settings", newSetting);
    return data;
  } catch (err) {
    throw new Error("Settings could not be created");
  }
}

// Update settings
export async function updateSetting(id, update) {
  try {
    const { data } = await axiosInstance.patch(`/settings/${id}`, update);
    return data;
  } catch (err) {
    throw new Error("Settings could not be updated");
  }
}
