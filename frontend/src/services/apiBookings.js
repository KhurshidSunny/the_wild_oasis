import { axiosInstance } from "../../axios";
import { withTestDataFallback } from "../test-data/apiFallback";
import { testDataService } from "../test-data/testDataService";

// NOTE: All original backend API code is preserved below.
// The withTestDataFallback wrapper only activates when backend is unavailable.
// When backend is available, original API calls execute normally.


// router.get('/getBookingsAfterDate', bookingController.getBookingsAfterDate)
// router.get('/getStaysTodayActivity', bookingController.getStaysTodayActivity);
// router.get('/getStaysAfterDate', bookingController.getStaysAfterDate);


export async function getBookingsAfterDate(date) {
  return withTestDataFallback(
    async () => {
      const res = await axiosInstance.get(`/bookings/getBookingsAfterDate`, {
        params: { date },
      });
      return res?.data?.date?.bookings;
    },
    () => testDataService.getBookingsAfterDate(date)
  );
}

// Fetch stays (bookings) that start after a given date
export async function getStaysAfterDate(date) {
  return withTestDataFallback(
    async () => {
      const res = await axiosInstance.get(`/bookings/getStaysAfterDate?date=${date}`);
      return res?.data?.data?.stays;
    },
    () => testDataService.getStaysAfterDate(date)
  );
}


// Get all stays (bookings) starting today
export async function getStaysTodayActivity() {
  return withTestDataFallback(
    async () => {
      const res = await axiosInstance.get('/bookings/getStaysTodayActivity');
      return res?.data?.data?.stays;
    },
    () => testDataService.getStaysTodayActivity()
  );
}


// Get all bookings
// Get all bookings
export async function getBookings({ filter, sortBy, page }) {
  return withTestDataFallback(
    async () => {
      const params = {
        ...filter,
        sortBy,
        page,
      };
      const { data } = await axiosInstance.get("/bookings", { params });
      return data;
    },
    () => {
      const result = testDataService.getBookings({ ...filter, sortBy, page });
      return {
        data: result.data,
        results: result.results,
        total: result.results,
      };
    }
  );
}


// Create a booking
export async function createBooking(newBooking) {
  return withTestDataFallback(
    async () => {
      const { data } = await axiosInstance.post("/bookings", newBooking);
      return data;
    },
    () => {
      const booking = testDataService.createBooking(newBooking);
      return { data: booking, status: "success" };
    }
  );
}


export async function getBooking(id) {
  return withTestDataFallback(
    async () => {
      const data = await axiosInstance.get(`bookings/${id}`);
      return data.data.data;
    },
    () => {
      const booking = testDataService.getBookingById(id);
      if (!booking) throw new Error('Could not find the Booking');
      return booking;
    }
  );
}

// Update a booking
export async function updateBooking(id, updateData) {
  return withTestDataFallback(
    async () => {
      const { data } = await axiosInstance.patch(`/bookings/${id}`, updateData);
      // Return in consistent format with booking ID
      return {
        data: data?.data || data,
        id: data?.data?.id || data?.data?._id || data?.id || id,
        status: "success",
      };
    },
    () => {
      const booking = testDataService.updateBooking(id, updateData);
      return { 
        data: booking, 
        id: booking.id || booking._id || id,
        status: "success" 
      };
    }
  );
}

// Delete a booking
// In demo mode, delete appears to work but data is preserved
export async function deleteBooking(id) {
  return withTestDataFallback(
    async () => {
      // Original backend API call - executes when backend is available
      const { data } = await axiosInstance.delete(`/bookings/${id}`);
      return data;
    },
    () => {
      // Test data fallback - safe mode enabled (doesn't actually delete)
      return testDataService.deleteBooking(id, true);
    }
  );
}
