const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  commonNumber: {
    type: String,
    required: true,
  },
  matchedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const collection = mongoose.model("users", userSchema);

export default collection;
