const mongoose = require("mongoose");

const { createDealService } = require("../services/dealService");

const createDeal = async (req, res) => {
  const { leadId, stageName } = req.body;

  try {
    const result = await createDealService(leadId, stageName);
    return res
      .status(result.status)
      .json({ message: result.message, deal: result.deal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating deal", error: error.message });
  }
};

module.exports = {
  createDeal,
};
