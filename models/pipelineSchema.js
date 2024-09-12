const mongoose = require("mongoose");

const stageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number, // Order in which the stages appear in the pipeline
    required: true,
  },
});

const pipelineSchema = mongoose.Schema(
  {
    stages: [stageSchema], // List of stages in the pipeline
  },
  {
    timestamps: true,
  }
);

const pipelineModel = mongoose.model("pipeline", pipelineSchema);
module.exports = pipelineModel;
