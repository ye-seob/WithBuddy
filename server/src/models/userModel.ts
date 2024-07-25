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
  major: {
    type: String,
    required: true,
  },

  instagramId: {
    type: String,
    required: false,
  },
  kakaoId: {
    type: String,
    required: false,
  },

  mbti: {
    type: String,
    required: false,
  },
});

const collection = mongoose.model("users", userSchema);

export default collection;
