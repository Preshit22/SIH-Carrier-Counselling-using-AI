const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  educationBoard: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
  },
  parentNumber: {
    type: String,
    required: true,
  },
  familyIncome: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Profile = new mongoose.model("Profile", profileSchema);

module.exports = Profile;
