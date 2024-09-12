const express = require("express");
const { createDeal, getDealsBypipelineId } = require("../controllers/deals");

const router = express.Router();

// route to convert the lead to deal

router.post("/", createDeal);
router.get("/:pipelineId/deals", getDealsBypipelineId);

module.exports = router;
