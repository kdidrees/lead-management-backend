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

const updatePipelineStages = async (pipelineId, stages) => {
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

    // iterate over the new stages and update the existing stages
    stages.forEach((updatedStage) => {
      const existingStage = pipeline.stages.id(updatedStage._id); // find by id

      if (existingStage) {
        // update only name and order field
        existingStage.name = updatedStage.name;
        existingStage.order = updatedStage.order;
      } else {
        throw new Error(`stage with ID ${updatedStage._id} not found`);
      }
    });

    await pipeline.save();

    return {
      status: 200,
      message: "success",
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

const getAllPipelines = async () => {
  try {
    const result = await pipelineModel.find();
    if (!result) {
      throw new Error("no pipeline found");
    }
    return {
      status: 200,
      message: "pipelines found",
      result,
    };
  } catch (error) {}
};

module.exports = {
  createPipeline,
  updatePipelineStages,
  deletePipeline,
  getAllPipelines,
};
