const dealModel = require("../models/dealSchema");

exports.dealController = async (req, res, next) => {
  try {
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);

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



