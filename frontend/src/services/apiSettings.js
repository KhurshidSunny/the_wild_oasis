import { axiosInstance } from "../../axios";


// Get settings 
export async function getSettings() {
  try{
    const data = await axiosInstance.get('/settings');
    console.log(data.data.data.settings)
    return data.data.data.settings[0];

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
  // console.log('id', id)
  // console.log(`update : ${update}`)
  try {
    const { data } = await axiosInstance.patch(`/settings/${id}`, update);
    return data;
  } catch (err) {
    throw new Error("Settings could not be updated");
  }
}
