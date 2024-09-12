const express = require("express");
const {
  updatePipelineStages,
  createPipeline,
} = require("../controllers/pipelineController");

const router = express.Router();

router.post("/", createPipeline);

// PUT route to update the pipeline stages
router.put("/:pipelineId/stages", updatePipelineStages);

module.exports = router;
