const express = require("express");
const guestController = require("../controllers/guestController");

const router = express.Router();

// chain routes
router.get("/guest_email/:email", guestController.getGuest);
router
  .route("/")
  .get(guestController.getGuests)
  .post(guestController.createGuest);
router
  .route("/:guest_id")
  .patch(guestController.updateGuest)
  .delete(guestController.deleteGuest);

module.exports = router;
