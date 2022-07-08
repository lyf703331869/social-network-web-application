const { Schema, Types } = require("mongoose");
const moment = require("moment");
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment.format(timestamp, "YYYY/MM/DD"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
module.exports = reactionSchema;