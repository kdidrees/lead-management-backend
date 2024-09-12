const {
  createPipelineService,
  updatePipelineStagesService,
} = require("../services/pipelineService");

const createPipeline = async (req, res) => {
  const { stages } = req.body; // Array of stages with names and orders

  try {
    const result = await createPipelineService(stages);
    res 
      .status(result.status)
      .json({ message: result.message, pipeline: result.pipeline });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating pipeline", error: error.message });
  }
};

const updatePipelineStages = async (req, res) => {
  const { pipelineId } = req.params; // Get pipelineId from route parameters
  const { stages } = req.body; // Array of updated stages with new order and names

  try {
    // Update pipeline stages via service
    const result = await updatePipelineStagesService(pipelineId, stages);
    res.status(result.status).json({ message: result.message, pipeline: result.pipeline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPipeline,
  updatePipelineStages,
};
