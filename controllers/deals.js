const mongoose = require("mongoose");
const dealModel = require("../models/dealSchema");
const {
  findLeadById,
  createDeal,
  updateDealStageById,
} = require("../services/dealService");

exports.dealController = async (req, res, next) => {
  try {
    const { leadId, stage } = req.body; // we will send the stage from frontend or by default it would be sent as Qualified

    // call the service to find  the lead by its ID
    const lead = await findLeadById(leadId);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // use the service to create a new deal
    const newDeal = await createDeal(lead._id, stage);

    res.json({ message: "lead converted to deal succesfully ", deal: newDeal });
  } catch (error) {
    next(error);
  }
};

// controller to update the stage

exports.updateDealStage = async (req, res, next) => {
  try {
    const { dealId, stage } = req.body;

    // call the service to update the deal stage
    const updateDeal = await updateDealStageById(dealId, stage);

    if (!updateDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json({ message: "deal stage updated successfully", deal: updateDeal });
  } catch (error) {
    next(error);
  }
};
