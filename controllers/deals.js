const mongoose = require("mongoose");

const dealService = require("../services/dealService");

const createDeal = async (req, res) => {
  const { leadId, pipelineId, stageId } = req.body;

  try {
    const result = await dealService.createDealService(
      leadId,
      pipelineId,
      stageId
    );
    return res
      .status(result.status)
      .json({ message: result.message, deal: result.deal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating deal", error: error.message });
  }
};

const getDealsBypipelineId = async (req, res, next) => {
  const { pipelineId } = req.params;

  let result;
  if (pipelineId) {
    result = await dealService.getDealsByPipelineId(pipelineId);
  } else {
    result = await dealService.getFirstPipelineDeal();
  }

  return res.status(200).json({
    message: "success",
    id: result.id,
    name: result.name,
    stages: result.stages,
  });
};

module.exports = {
  createDeal,
  getDealsBypipelineId,
};
