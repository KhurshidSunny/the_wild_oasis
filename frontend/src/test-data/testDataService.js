import { isFuture, isPast, isToday } from "date-fns";
import { testCabins } from "./test-cabins";
import { testGuests } from "./test-guests";
import { testBookings } from "./test-bookings";
import { testSettings } from "./test-settings";
import { subtractDates } from "../utils/helpers";

// Process and link all test data
class TestDataService {
  constructor() {
    this.cabins = [];
    this.guests = [];
    this.bookings = [];
    this.settings = testSettings;
    this.initialized = false;
  }

  // Initialize all test data with proper IDs and relationships
  initialize() {
    if (this.initialized) return;

    // Initialize cabins with IDs
    this.cabins = testCabins.map((cabin, index) => ({
      ...cabin,
      _id: `cabin-${index + 1}`,
      id: `cabin-${index + 1}`,
      createdAt: new Date().toISOString(),
    }));

    // Initialize guests with IDs
    this.guests = testGuests.map((guest, index) => ({
      ...guest,
      _id: `guest-${index + 1}`,
      id: `guest-${index + 1}`,
    }));

    // Process bookings - link with cabins and guests, calculate prices and status
    this.bookings = testBookings.map((booking, index) => {
      const cabin = this.cabins[booking.cabinId - 1];
      const guest = this.guests[booking.guestId - 1];
      
      if (!cabin || !guest) {
        console.warn(`Missing cabin or guest for booking ${index}`);
        return null;
      }

      const numNights = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * this.settings.breakfastPrice * booking.numGuests
        : 0;
      const totalPrice = cabinPrice + extrasPrice;

      // Determine status based on dates
      let status;
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      ) {
        status = "checked-out";
      } else if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      ) {
        status = "unconfirmed";
      } else if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      ) {
        status = "checked-in";
      } else {
        status = "unconfirmed";
      }

      return {
        _id: `booking-${index + 1}`,
        id: `booking-${index + 1}`,
        createdAt: booking.created_at,
        startDate: booking.startDate,
        endDate: booking.endDate,
        numNights,
        numGuests: booking.numGuests,
        cabinPrice,
        extrasPrice,
        totalPrice,
        status,
        hasBreakfast: booking.hasBreakfast,
        isPaid: booking.isPaid,
        observations: booking.observations || "",
        cabin: cabin,
        guest: guest,
        cabinId: cabin._id,
        guestId: guest._id,
      };
    }).filter(Boolean);

    this.initialized = true;
  }

  // Get all cabins
  getCabins() {
    return this.cabins;
  }

  // Get cabin by ID
  getCabinById(id) {
    return this.cabins.find((c) => c._id === id || c.id === id);
  }

  // Get all guests
  getGuests() {
    return this.guests;
  }

  // Get guest by ID
  getGuestById(id) {
    return this.guests.find((g) => g._id === id || g.id === id);
  }

  // Get all bookings
  getBookings(filters = {}) {
    let filtered = [...this.bookings];

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter((b) => b.status === filters.status);
    }

    // Sort
    if (filters.sortBy) {
      const parts = filters.sortBy.split("-");
      const field = parts[0];
      const direction = parts[1] || "desc"; // Default to desc if no direction specified
      
      filtered.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        // Handle dates
        if (field.includes("Date")) {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }
        
        if (direction === "asc") {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    // Pagination
    const page = filters.page || 1;
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filtered.slice(start, end),
      results: filtered.length,
      totalPages: Math.ceil(filtered.length / pageSize),
      currentPage: page,
    };
  }

  // Get booking by ID
  getBookingById(id) {
    return this.bookings.find((b) => b._id === id || b.id === id);
  }

  // Get bookings after date
  getBookingsAfterDate(date) {
    const dateObj = new Date(date);
    return this.bookings.filter(
      (b) => new Date(b.createdAt) >= dateObj
    );
  }

  // Get stays after date
  getStaysAfterDate(date) {
    const dateObj = new Date(date);
    return this.bookings.filter(
      (b) => new Date(b.startDate) >= dateObj
    );
  }

  // Get today's activity (stays starting today)
  getStaysTodayActivity() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return this.bookings.filter((b) => {
      const startDate = new Date(b.startDate);
      return startDate >= today && startDate < tomorrow;
    });
  }

  // Get booked dates for a cabin
  getBookedDatesByCabinId(cabinId) {
    const cabinBookings = this.bookings.filter(
      (b) => (b.cabin?._id === cabinId || b.cabinId === cabinId)
    );

    const bookedDates = [];
    cabinBookings.forEach((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const current = new Date(start);
      
      while (current <= end) {
        bookedDates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });

    return bookedDates;
  }

  // Get settings
  getSettings() {
    return this.settings;
  }

  // Create booking (for testing)
  createBooking(bookingData) {
    const cabin = this.getCabinById(bookingData.cabinId);
    const guest = this.getGuestById(bookingData.guestId);
    
    if (!cabin || !guest) {
      throw new Error("Cabin or guest not found");
    }

    const numNights = subtractDates(bookingData.endDate, bookingData.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = bookingData.hasBreakfast
      ? numNights * this.settings.breakfastPrice * bookingData.numGuests
      : 0;

    const newBooking = {
      _id: `booking-${this.bookings.length + 1}`,
      id: `booking-${this.bookings.length + 1}`,
      createdAt: new Date().toISOString(),
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      numNights,
      numGuests: bookingData.numGuests,
      cabinPrice,
      extrasPrice,
      totalPrice: cabinPrice + extrasPrice,
      status: "unconfirmed",
      hasBreakfast: bookingData.hasBreakfast || false,
      isPaid: bookingData.isPaid || false,
      observations: bookingData.observations || "",
      cabin,
      guest,
      cabinId: cabin._id,
      guestId: guest._id,
    };

    this.bookings.push(newBooking);
    return newBooking;
  }

  // Update booking
  updateBooking(id, updateData) {
    const index = this.bookings.findIndex(
      (b) => b._id === id || b.id === id
    );
    if (index === -1) {
      throw new Error("Booking not found");
    }

    this.bookings[index] = {
      ...this.bookings[index],
      ...updateData,
    };

    return this.bookings[index];
  }

  // Delete booking (safe mode - doesn't actually delete in demo mode)
  deleteBooking(id, safeMode = true) {
    const index = this.bookings.findIndex(
      (b) => b._id === id || b.id === id
    );
    if (index === -1) {
      throw new Error("Booking not found");
    }

    // In safe mode (demo), don't actually delete, just return success
    if (safeMode) {
      console.log("Demo mode: Delete operation simulated (data preserved)");
      return { status: "success", data: null, demoMode: true };
    }

    // Only actually delete if safeMode is false (shouldn't happen in demo)
    this.bookings.splice(index, 1);
    return { status: "success", data: null };
  }

  // Delete cabin (safe mode)
  deleteCabin(id, safeMode = true) {
    const index = this.cabins.findIndex(
      (c) => c._id === id || c.id === id
    );
    if (index === -1) {
      throw new Error("Cabin not found");
    }

    if (safeMode) {
      console.log("Demo mode: Delete operation simulated (data preserved)");
      return { status: "success", data: null, demoMode: true };
    }

    this.cabins.splice(index, 1);
    return { status: "success", data: null };
  }
}

// Export singleton instance
export const testDataService = new TestDataService();

