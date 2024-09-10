const mongoose = require("mongoose");
const dealModel = require("../models/dealSchema");
const dbConnection=require('../config/db')

exports.dealController = async (req, res, next) => {
  try {
    const leadId = '66e004853676fa682f9e11b7';

    // query the leads collection
    const lead =dbConnection.db.collection("leads")
      .find();
      
      
    
    if (!lead) {
      return res.status(404).json({ message: "Lead not found",lead });
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
