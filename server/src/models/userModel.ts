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
    type: String,
    default: "아직 연결되지 않았습니다",
  },
});

const collection = mongoose.model("users", userSchema);

export default collection;
