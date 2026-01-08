import { testDataService } from "./testDataService";

// Initialize test data when app loads
export function initializeTestData() {
  // Initialize the test data service
  testDataService.initialize();
  
  console.log("✅ Test data initialized");
  console.log(`   - ${testDataService.getCabins().length} cabins`);
  console.log(`   - ${testDataService.getGuests().length} guests`);
  console.log(`   - ${testDataService.getBookings().data.length} bookings`);
}

