const express = require("express");
const { createDeal } = require("../controllers/deals");

const router = express.Router();

// route to convert the lead to deal

router.post("/", createDeal);

module.exports = router;
