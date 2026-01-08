// Check if error indicates backend is unavailable
function isBackendUnavailable(error) {
  if (!error) return false;
  
  // Network errors
  if (error.code === "ERR_NETWORK" || error.message?.includes("Network Error")) {
    return true;
  }
  
  // Timeout errors
  if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
    return true;
  }
  
  // 5xx server errors (server down)
  if (error.response?.status >= 500) {
    return true;
  }
  
  // Connection refused
  if (error.message?.includes("ERR_CONNECTION_REFUSED") || 
      error.message?.includes("Failed to fetch")) {
    return true;
  }
  
  return false;
}

// Wrapper function to try API call and fallback to test data
export async function withTestDataFallback(apiCall, testDataCall) {
  try {
    return await apiCall();
  } catch (error) {
    if (isBackendUnavailable(error)) {
      console.log("Backend unavailable, using test data");
      return testDataCall();
    }
    throw error;
  }
}

export { isBackendUnavailable };

