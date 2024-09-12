const dealModel = require("../models/dealSchema");
const pipelineModel = require("../models/pipelineSchema");

const createDealService = async (leadId, stageName) => {
  try {
    // Find the pipeline to get the stage information
    const pipeline = await pipelineModel.findOne();
    if (!pipeline) {
      throw new Error("Pipeline not found");
    }

    // Find the correct stage from the pipeline by name
    const stage = pipeline.stages.find((s) => s.name === stageName);
    if (!stage) {
      throw new Error("Stage not found in the pipeline");
    }

    // Create a new deal with the selected stage name
    const newDeal = new dealModel({
      leadId,
      stage: stage.name,
    });

    await newDeal.save();
    return { status: 201, message: "Deal created successfully", deal: newDeal };
  } catch (error) {
    throw new Error("Error creating deal: " + error.message);
  }
};

module.exports = {
  createDealService,
};
