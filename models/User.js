const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
});
