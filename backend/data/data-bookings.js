  import { add } from 'date-fns';

  function fromToday(numDays, withTime = false) {
    const date = add(new Date(), { days: numDays });
    if (!withTime) date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().slice(0, -1);
    
  }



export const bookings = [
  // CABIN 001
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    cabin: "687b87e86e760851e351df50",
    guest: "6877dd5f6acae846842ad81c",
    hasBreakfast: true,
    observations: 'I have a gluten allergy and would like to request a gluten-free breakfast.',
    isPaid: false,
    status: "checked-in",
    numGuests: 1,
    numNights: 7,
    cabinPrice: 250,
    extrasPrice: 200
  },
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    cabin: "687b87e86e760851e351df50",
    guest: "6877dd5f6acae846842ad81b",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 2,
    numNights: 4,
    cabinPrice: 250,
    extrasPrice: 180
  },
  {
    created_at: fromToday(-27, true),
    startDate: fromToday(12),
    endDate: fromToday(18),
    cabin: "687b87e86e760851e351df50",
    guest: "6877dd5f6acae846842ad81f",
    hasBreakfast: false,
    observations: '',
    isPaid: false,
    status: "checked-in",
    numGuests: 2,
    numNights: 6,
    cabinPrice: 250,
    extrasPrice: 220
  },

  // CABIN 002
  {
    created_at: fromToday(-45, true),
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    cabin: "687b88576e760851e351df6e",
    guest: "6877dd5f6acae846842ad820",
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    status: "checked-in",
    numGuests: 2,
    numNights: 5,
    cabinPrice: 325,
    extrasPrice: 300
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(15),
    endDate: fromToday(18),
    cabin: "687b88576e760851e351df6e",
    guest: "6877dd5f6acae846842ad822",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    status: "checked-in",
    numGuests: 2,
    numNights: 4,
    cabinPrice: 325,
    extrasPrice: 280
  },
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(33),
    endDate: fromToday(48),
    cabin: "687b88576e760851e351df6e",
    guest: "6877dd5f6acae846842ad823",
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    status: "checked-out",
    numGuests: 2,
    numNights: 2,
    cabinPrice: 325,
    extrasPrice: 310
  },

  // CABIN 003
  {
    created_at: fromToday(-65, true),
    startDate: fromToday(-25),
    endDate: fromToday(-20),
    cabin: "687b887b6e760851e351df74",
    guest: "6877dd5f6acae846842ad824",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
    numNights: 9,
    cabinPrice: 300,
    extrasPrice: 280
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    cabin: "687b887b6e760851e351df74",
    guest: "6877dd5f6acae846842ad825",
    hasBreakfast: false,
    observations: 'We will be bringing our small dog with us',
    isPaid: true,
    status: "checked-out",
    numGuests: 3,
    numNights: 6,
    cabinPrice: 300,
    extrasPrice: 250
  },
  {
    created_at: fromToday(-14, true),
    startDate: fromToday(-14),
    endDate: fromToday(-11),
    cabin: "687b887b6e760851e351df74",
    guest: "6877dd5f6acae846842ad826",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
    numNights: 7,
    cabinPrice: 300,
    extrasPrice: 270
  },

  // CABIN 004
  {
    created_at: fromToday(-30, true),
    startDate: fromToday(-4),
    endDate: fromToday(8),
    cabin: "687b88ac6e760851e351df7a",
    guest: "6877dd5f6acae846842ad827",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    status: "checked-out",
    numGuests: 4,
    numNights: 4,
    cabinPrice: 450,
    extrasPrice: 400
  },
  {
    created_at: fromToday(-1, true),
    startDate: fromToday(12),
    endDate: fromToday(17),
    cabin: "687b88ac6e760851e351df7a",
    guest: "6877dd5f6acae846842ad828",
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    status: "checked-out",
    numGuests: 4,
    numNights: 4,
    cabinPrice: 450,
    extrasPrice: 420
  },
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(18),
    endDate: fromToday(19),
    cabin: "687b88ac6e760851e351df7a",
    guest: "6877dd5f6acae846842ad81d",
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    status: "checked-out",
    numGuests: 1,
    numNights: 3,
    cabinPrice: 450,
    extrasPrice: 430
  },

  // CABIN 005
  {
    created_at: fromToday(0, true),
    startDate: fromToday(14),
    endDate: fromToday(21),
    cabin: "687b88ce6e760851e351df7c",
    guest: "6877dd5f6acae846842ad82a",
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    numGuests: 5,
    numNights: 5,
    cabinPrice: 350,
    extrasPrice: 320
  },
  {
    created_at: fromToday(-6, true),
    startDate: fromToday(-6),
    endDate: fromToday(-4),
    cabin: "687b88ce6e760851e351df7c",
    guest: "6877dd5f6acae846842ad82b",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    status: "unconfirmed",
    numGuests: 4,
    numNights: 6,
    cabinPrice: 350,
    extrasPrice: 300
  },
  {
    created_at: fromToday(-4, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabin: "687b88ce6e760851e351df7c",
    guest: "6877dd5f6acae846842ad82c",
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    status: "unconfirmed",
    numGuests: 6,
    numNights: 4,
    cabinPrice: 350,
    extrasPrice: 310
  },

  // CABIN 006
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(0),
    endDate: fromToday(11),
    cabin: "687b89016e760851e351df86",
    guest: "6877dd5f6acae846842ad82d",
    hasBreakfast: false,
    observations: "We will be checking in late, around midnight. Hope that's okay :)",
    isPaid: true,
    status: "unconfirmed",
    numGuests: 6,
    numNights: 9,
    cabinPrice: 700,
    extrasPrice: 650
  },
  {
    created_at: fromToday(-16, true),
    startDate: fromToday(-16),
    endDate: fromToday(-9),
    cabin: "687b89016e760851e351df86",
    guest: "6877dd5f6acae846842ad82e",
    hasBreakfast: true,
    observations: 'I will need a rollaway bed for one of the guests',
    isPaid: true,
    numGuests: 4,
    numNights: 8,
    cabinPrice: 700,
    extrasPrice: 670
  },
  {
    created_at: fromToday(-18, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabin: "687b89016e760851e351df86",
    guest: "6877dd5f6acae846842ad82f",
    hasBreakfast: true,
    observations: '',
    isPain: true,
    status: "unconfirmed",
    numGuests: 6,
    numNights: 3,
    cabinPrice: 700,
    extrasPrice: 680
  },

  // CABIN 007
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(17),
    endDate: fromToday(23),
    cabin: "687b89266e760851e351df8e",
    guest: "6877dd5f6acae846842ad830",
    hasBreakfast: false,
    observations: '',
    isPaid: false,
    status: "unconfirmed",
    numGuests: 8,
    numNights: 2,
    cabinPrice: 500,
    extrasPrice: 480
  },
  {
    created_at: fromToday(-7, true),
    startDate: fromToday(40),
    endDate: fromToday(50),
    cabin: "687b89266e760851e351df8e",
    guest: "6877dd5f6acae846842ad831",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    status: "unconfirmed",
    numGuests: 7,
    numNights: 7,
    cabinPrice: 500,
    extrasPrice: 470
  },
  {
    created_at: fromToday(-55, true),
    startDate: fromToday(32),
    endDate: fromToday(37),
    cabin: "687b89266e760851e351df8e",
    guest: "6877dd5f6acae846842ad832",
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    status: "checked-out",
    numGuests: 6,
    numNights: 6,
    cabinPrice: 500,
    extrasPrice: 490
  },

  // CABIN 008
  {
    created_at: fromToday(-8, true),
    startDate: fromToday(-5),
    endDate: fromToday(0),
    cabin: "687b89426e760851e351df90",
    guest: "6877dd5f6acae846842ad81c",
    hasBreakfast: true,
    observations: 'My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible',
    isPaid: true,
    status: "checked-in",
    numGuests: 9,
    numNights: 5,
    cabinPrice: 1400,
    extrasPrice: 1300
  },
  {
    created_at: fromToday(0, true),
    startDate: fromToday(0),
    endDate: fromToday(5),
    cabin: "687b89426e760851e351df90",
    guest: "6877dd5f6acae846842ad833",
    hasBreakfast: true,
    observations: 'I am celebrating my anniversary, can you arrange for any special amenities or decorations?',
    isPaid: true,
    status: "unconfirmed",
    numGuests: 10,
    numNights: 8,
    cabinPrice: 1400,
    extrasPrice: 1350
  },
  {
    created_at: fromToday(-10, true),
    startDate: fromToday(10),
    endDate: fromToday(13),
    cabin: "687b89426e760851e351df90",
    guest: "6877dd5f6acae846842ad81e",
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    status: "checked-in",
    numGuests: 7,
    numNights: 4,
    cabinPrice: 1400,
    extrasPrice: 1250
  },
];