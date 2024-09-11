const mongoose = require("mongoose");
const dealModel = require("../models/dealSchema");

exports.findLeadById = async (leadId) => {
  // Query the leads collection for a lead by ID
  const lead = await mongoose.connection
    .collection("leads")
    .findOne({ _id: new mongoose.Types.ObjectId(leadId) });
  return lead;
};

exports.createDeal = async (leadId, stage) => {
  // check if a deal with this leadid already exist
  const existingDeal = await dealModel.findOne({ leadId });

  if (existingDeal) {
    throw new Error("A deal with this lead already exists");
  }

  // Create a new deal
  const newDeal = new dealModel({
    leadId,
    stage,
  });

  // save the deal to the database
  await newDeal.save();
  return newDeal;
};

exports.updateDealStageById = async (dealId, stage) => {
  // update the deal stage
  const updateDeal = await dealModel.findByIdAndUpdate(
    dealId,
    { stage },
    { new: true, runValidators: true }
  );
  return updateDeal;
};
