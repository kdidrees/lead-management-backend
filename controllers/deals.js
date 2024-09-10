const mongoose = require("mongoose");
const dealModel = require("../models/dealSchema");

exports.dealController = async (req, res, next) => {
  try {
    const leadId = req.params.id;

    // query the leads collection
    const lead = await mongoose.connection
      .collection("leads")
      .findOne({ _id: mongoose.Types.ObjectId(leadId) });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // create a deal by referencing the lead

    const newDeal = new dealModel({
      leadId: lead._id,
      stage: "Qualified",
    });

    await newDeal.save();

    res.json({ message: "lead converted to deal succesfully ", deal: newDeal });
  } catch (error) {
    next(error);
  }
};
