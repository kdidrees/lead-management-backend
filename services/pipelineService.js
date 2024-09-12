const pipelineModel = require("../models/pipelineSchema");

const createPipelineService = async (stages) => {
  try {
    // Ensure that stages are provided and formatted correctly
    if (!stages || !stages.length) {
      throw new Error("Stages are required to create a pipeline.");
    }

    // Check if the pipeline already exists (you can allow one pipeline or multiple pipelines)
    const existingPipeline = await pipelineModel.findOne();
    if (existingPipeline) {
      throw new Error("Pipeline already exists. You can update it instead.");
    }

    // Create a new pipeline with the provided stages
    const newPipeline = new pipelineModel({ stages });
    await newPipeline.save();

    return {
      status: 201,
      message: "Pipeline created successfully",
      pipeline: newPipeline,
    };
  } catch (error) {
    throw new Error("Error creating pipeline: " + error.message);
  }
};

const updatePipelineStagesService = async (pipelineId, stages) => {
  try {
    // Find the pipeline by its ID
    const pipeline = await pipelineModel.findById(pipelineId);
    if (!pipeline) {
      throw new Error("Pipeline not found");
    }

    // Validate stages array
    if (!Array.isArray(stages) || stages.length === 0) {
      throw new Error("Invalid stages data");
    }

    // Update the stages with the new order and names
    pipeline.stages = stages;
    await pipeline.save();

    return {
      status: 200,
      message: "Pipeline stages updated successfully",
      pipeline,
    };
  } catch (error) {
    throw new Error("Error updating pipeline: " + error.message);
  }
};
module.exports = {
  createPipelineService,
  updatePipelineStagesService,
};
