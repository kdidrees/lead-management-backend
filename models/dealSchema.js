const mongoose = require("mongoose");

const dealSchema = mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leads",
      required: true,
    },
    pipelineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pipelines",
      required: true,
    },
    stageId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const dealModel = mongoose.model("deals", dealSchema);
module.exports = dealModel;
