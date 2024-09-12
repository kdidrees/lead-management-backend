const express = require("express");
const {
  updatePipelineStages,
  createPipeline,
  deletePipeline,
} = require("../controllers/pipelineController");

const router = express.Router();

router.post("/", createPipeline);

// PUT route to update the pipeline stages
router.put("/:pipelineId/stages", updatePipelineStages);

// delete route to delete pipeline
router.delete("/:id", deletePipeline);

module.exports = router;
