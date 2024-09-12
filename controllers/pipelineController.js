const pipelineService = require("../services/pipelineService");

const createPipeline = async (req, res) => {
  const { stages } = req.body; // Array of stages with names and orders

  try {
    const result = await pipelineService.createPipeline(stages);
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
  const { stages } = req.body; // Array of stages with updated names and orders

  try {
    const result = await pipelineService.updatePipelineStages(stages);
    return res
      .status(result.status)
      .json({ message: result.message, pipeline: result.pipeline });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating pipeline", error: error.message });
  }
};

module.exports = {
  createPipeline,
  updatePipelineStages,
};
