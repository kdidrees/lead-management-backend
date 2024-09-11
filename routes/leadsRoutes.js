const express = require("express");
const { dealController, updateDealStage } = require("../controllers/deals");

const router = express.Router();

// route to convert the lead to deal

router.post("/deals", dealController);
router.post("/deals/update", updateDealStage);

module.exports = router;
