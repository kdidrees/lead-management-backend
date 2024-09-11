const mongoose = require("mongoose");
const dealModel = require("../models/dealSchema");

exports.dealController = async (req, res, next) => {
  try {
    const { leadId, stage } = req.body; // we will send the stage from frontend or by default it would be sent as Qualified

    // query the leads collection
    const lead = await mongoose.connection
      .collection("leads")
      .findOne({ _id: new mongoose.Types.ObjectId(leadId) });

    console.log(lead, "haha");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // create a deal by referencing the lead
    const newDeal = new dealModel({
      leadId: lead._id,
      stage,
    });

    await newDeal.save();

    res.json({ message: "lead converted to deal succesfully ", deal: newDeal });
  } catch (error) {
    next(error);
  }
};

// controller to update the stage

exports.updateDealStage = async (req, res, next) => {
  try {
    const { dealId, stage } = req.body;

    // update the deal stage directly
    const updateDeal = await dealModel.findByIdAndUpdate(
      dealId,
      { stage }, // mongoose will validate the stage here
      { new: true, runValidators: true }
    );

    if (!updateDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json({ message: "deal stage updated successfully", deal: updateDeal });
  } catch (error) {
    next(error);
  }
};
