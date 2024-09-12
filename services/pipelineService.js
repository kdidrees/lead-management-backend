const pipelineModel = require("../models/pipelineSchema");

const createPipeline = async (name, stages) => {
  try {
    // Ensure that stages are provided and formatted correctly
    if (!name || !stages || !stages.length) {
      throw new Error("Stages are required to create a pipeline.");
    }

    const existingPipeline = await pipelineModel.findOne();
    // if (existingPipeline) {
    //   throw new Error("Pipeline already exists. You can update it instead.");
    // }

    // Create a new pipeline with the provided stages
    const newPipeline = new pipelineModel({ name, stages });
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

const deletePipeline = async (id) => {
  try {
    // find and delete pipeline

    const result = await pipelineModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error("pipeline not found");
    }
    return { status: 200, message: "Pipeline deleted successfully" };
  } catch (error) {
    throw new Error("error deleting pipeline" + error.message);
  }
};





module.exports = {
  createPipeline,
  updatePipelineStagesService,
  deletePipeline,
};
