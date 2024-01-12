const mongoose = require("mongoose");

const reportsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },
  hobbiesTestScores: Object,
  nonConventionalTestScores: Object,
  totalAptiScore: Number,
  interestTestScores: Object,
  psychoTestScores: Object,
});

const Report = new mongoose.model("Report", reportsSchema);

module.exports = Report;
