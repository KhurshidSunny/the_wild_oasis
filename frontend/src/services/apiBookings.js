import { axiosInstance } from "../../axios";



export async function getBookingsAfterDate(date) {
  try {
    const res = await axiosInstance.get(`/bookings/getBookingsAfterDate`, {
      params: { date },
    });
    return res.data.data.bookings;
  } catch (err) {
    throw new Error("Could not fetch bookings after date");
  }
}

// Fetch stays (bookings) that start after a given date
export async function getStaysAfterDate(date) {
  try {
    const res = await axiosInstance.get(`/bookings/getStaysAfterDate?date=${date}`);
    return res.data.data.stays;
  } catch (err) {
    throw new Error("Could not fetch stays after the given date");
  }
}


// Get all stays (bookings) starting today
export async function getStaysTodayActivity() {
  try {
    const res = await axiosInstance.get('/bookings/getStaysTodayActivity');
    return res.data.data.stays;
  } catch (err) {
    throw new Error('Could not fetch today’s stay activity');
  }
}


// Get all bookings
export async function getBookings() {
  try {
    const { data } = await axiosInstance.get("/bookings");
    return data.data.bookings;
  } catch (err) {
    throw new Error("Bookings could not be loaded");
  }
}

// Create a booking
export async function createBooking(newBooking) {
  try {
    const { data } = await axiosInstance.post("/bookings", newBooking);
    return data;
  } catch (err) {
    throw new Error("Booking could not be created");
  }
}


export async function getBooking(id) {
  try{
    const data = await axiosInstance.get(`/${id}`);
    return data;

  }catch(err) {
    throw new Error('Could not find the Booking')
  }
}

// Update a booking
export async function updateBooking(id, updateData) {
  try {
    const { data } = await axiosInstance.patch(`/bookings/${id}`, updateData);
    return data;
  } catch (err) {
    throw new Error("Booking could not be updated");
  }
}

// Delete a booking
export async function deleteBooking(id) {
  try {
    const { data } = await axiosInstance.delete(`/bookings/${id}`);
    return data;
  } catch (err) {
    throw new Error("Booking could not be deleted");
  }
}
