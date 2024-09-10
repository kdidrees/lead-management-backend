const express = require("express");
const { dealController } = require("../controllers/deals");

const router = express.Router();

// route to convert the lead to deal

router.post("/deals", dealController);


module.exports = router;
