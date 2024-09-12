const mongoose = require("mongoose");

const dealSchema = mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leads",
      required: true,
    },
    stage: {
      type: String, // Only store the name of the current stage
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const dealModel = mongoose.model("deals", dealSchema);
module.exports = dealModel;




