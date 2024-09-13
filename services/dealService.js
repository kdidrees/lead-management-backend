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

    // access the leads collection
    const leadsCollection = await mongoose.connection.collection("leads");

    // fetch lead details for each deal asynchronously
    const dealWithLeadDetails = await Promise.all(
      deals.map(async (deal) => {
        const leadDetails = await leadsCollection.findOne({
          _id: new mongoose.Types.ObjectId(deal.leadId),
        });

        // attach the lead details to deal
        return {
          ...deal.toObject(),
          leadDetails,
        };
      })
    );

    // structure deals by stages
    const stagesWithDeals = pipeline.stages.map((stage) => ({
      _id: stage._id,
      name: stage.name,
      order: stage.order,
      deals: dealWithLeadDetails.filter(
        (deal) => deal.stageId.toString() === stage._id.toString()
      ),
    }));

    return stagesWithDeals;
  } catch (error) {
    throw new Error("error fetching details " + error.message);
  }
};

const getFirstPipelineDeal = async () => {
  try {
    // Fetch the first pipeline (ordered by _id)
    const pipeline = await pipelineModel.findOne().sort({ _id: 1 });

    if (!pipeline) {
      throw new Error("No pipelines found");
    }

    // Fetch all deals for this pipeline
    const deals = await dealModel.find({ pipelineId: pipeline._id });

    // Access the leads collection
    const leadsCollection = await mongoose.connection.collection("leads");

    // Fetch lead details for each deal asynchronously
    const dealWithLeadDetails = await Promise.all(
      deals.map(async (deal) => {
        const leadDetails = await leadsCollection.findOne({
          _id: new mongoose.Types.ObjectId(deal.leadId),
        });

        // Attach the lead details to deal
        return {
          ...deal.toObject(),
          leadDetails,
        };
      })
    );

    // Structure deals by stages
    const stagesWithDeals = pipeline.stages.map((stage) => ({
      _id: stage._id,
      name: stage.name,
      order: stage.order,
      deals: dealWithLeadDetails.filter(
        (deal) => deal.stageId.toString() === stage._id.toString()
      ),
    }));

    return stagesWithDeals;
  } catch (error) {
    throw new Error("Error fetching first pipeline deals: " + error.message);
  }
};


module.exports = {
  createDealService,
  getDealsByPipelineId,
  getFirstPipelineDeal
};
