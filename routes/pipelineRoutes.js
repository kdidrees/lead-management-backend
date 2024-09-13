const express = require("express");
const {
  updatePipelineStages,
  createPipeline,
  deletePipeline,
  getAllPipelines,
} = require("../controllers/pipelineController");

const router = express.Router();

router.post("/", createPipeline);

// PUT route to update the pipeline stages
router.put("/:pipelineId/stages", updatePipelineStages);

// delete route to delete pipeline
router.delete("/:id", deletePipeline);
router.get("/all", getAllPipelines);

module.exports = router;
