const mongoose = require("mongoose");

const dealSchema = mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    stage: {
      type: String,
      enum: [
        "Qualified",
        "Contact Made",
        "Demo Scheduled",
        "Proposal Made",
        "Negotiations Started",
      ],
      default: "Qualified",
    },
  },
  {
    timestamps: true,
  }
);

const dealModel = mongoose.model("deals", dealSchema);
module.exports = dealModel;
