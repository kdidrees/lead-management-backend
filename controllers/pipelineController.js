const pipelineService = require("../services/pipelineService");

const createPipeline = async (req, res) => {
  const { name, stages } = req.body; // Array of stages with names and orders

  try {
    const result = await pipelineService.createPipeline(name, stages);
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
  const { pipelineId } = req.params;
  const { stages } = req.body; // Array of updated stages with new order and names

  try {
    // Update pipeline stages via service
    const result = await pipelineService.updatePipelineStages(
      pipelineId,
      stages
    );
    res
      .status(result.status)
      .json({ message: result.message, pipeline: result.pipeline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePipeline = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pipelineService.deletePipeline(id);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting pipeline", error: error.message });
  }
};

const getAllPipelines = async (req, res, next) => {
  try {
    const result = await pipelineService.getAllPipelines();
    res.status(result.status).json({ message: result.result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPipeline,
  updatePipelineStages,
  deletePipeline,
  getAllPipelines,
};
