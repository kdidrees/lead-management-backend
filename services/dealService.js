const dealModel = require("../models/dealSchema");
const pipelineModel = require("../models/pipelineSchema");
const mongoose = require("mongoose");

const createDealService = async (leadId, pipelineId, stageId) => {
  // Log the pipelineId for debugging
  console.log("Received pipelineId:", pipelineId);
  try {
    // Find the pipeline to get the stage information
    const pipeline = await pipelineModel.findById(pipelineId);
    if (!pipeline) {
      throw new Error("Pipeline not found");
    }

    // Find the correct stage from the pipeline by name
    const stage = pipeline.stages.find((s) => s._id.toString() === stageId);
    if (!stage) {
      throw new Error("Stage not found in the pipeline");
    }

    // Create a new deal with the selected stage name
    const newDeal = new dealModel({
      leadId,
      pipelineId,
      stageId,
    });

    await newDeal.save();
    return { status: 201, message: "Deal created successfully", deal: newDeal };
  } catch (error) {
    throw new Error("Error creating deal: " + error.message);
  }
};

const getDealsByPipelineId = async (pipelineId) => {
  try {
    const pipeline = await pipelineModel.findById(pipelineId);
    if (!pipeline) {
      throw new Error("pipeline not found");
    }

    // fetch all the deals for this pipeline
    const deals = await dealModel.find({ pipelineId });

    // structure deals by stages
    const stagesWithDeals = pipeline.stages.map((stage) => ({
      _id: stage._id,
      name: stage.name,
      order: stage.order,
      deals: deals.filter(
        (deal) => deal.stageId.toString() === stage._id.toString()
      ),
    }));

    return stagesWithDeals;
  } catch (error) {
    throw new Error("error fetching details" + error.message);
  }
};

module.exports = {
  createDealService,
  getDealsByPipelineId,
};
