const express = require("express");
const settingController = require("../controllers/settingController");

const router = express.Router();

router
  .route("/")
  .get(settingController.getAllSettings)
  .post(settingController.createSetting);
router.route("/:settingId").patch(settingController.updateSetting);

module.exports = router;
