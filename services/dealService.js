const dealModel = require("../models/dealSchema");
const pipelineModel = require("../models/pipelineSchema");
const mongoose = require("mongoose");

const createDealService = async (leadId, pipelineId, stageName) => {
  // Log the pipelineId for debugging
  console.log("Received pipelineId:", pipelineId);
  try {
    
    // Find the pipeline to get the stage information
    const pipeline = await pipelineModel.findById(pipelineId);
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
      pipelineId,
      stage: stageName,
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
