import { axiosInstance } from "../../axios";
import { withTestDataFallback } from "../test-data/apiFallback";
import { testDataService } from "../test-data/testDataService";

// NOTE: All original backend API code is preserved below.
// The withTestDataFallback wrapper only activates when backend is unavailable.
// When backend is available, original API calls execute normally.


// Get settings 
export async function getSettings() {
  return withTestDataFallback(
    async () => {
      const data = await axiosInstance.get('/settings');
      return data.data.data.settings[0];
    },
    () => testDataService.getSettings()
  );
}

// Create settings
export async function createSetting(newSetting) {
  return withTestDataFallback(
    async () => {
      const { data } = await axiosInstance.post("/settings", newSetting);
      return data;
    },
    () => {
      // For test data, just return success
      return { status: "success", data: newSetting };
    }
  );
}

// Update settings
export async function updateSetting(id, update) {
  return withTestDataFallback(
    async () => {
      const { data } = await axiosInstance.patch(`/settings/${id}`, update);
      return data;
    },
    () => {
      // For test data, update the settings in the service
      const currentSettings = testDataService.getSettings();
      const updated = { ...currentSettings, ...update };
      testDataService.settings = updated;
      return { status: "success", data: updated };
    }
  );
}
