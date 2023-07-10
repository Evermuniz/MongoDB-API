// Reaction schema used in the Thought model
const { Schema, Types } = require("mongoose");
// getter to format the timestamp on query
const { getFormattedDate } = require("../utils/date");

const ReactionSchema = new Schema(
  {
    //id using the ObjectId type provided by Mongoose
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    // formatted timestamp
    createdAt: {
      type: String,
      default: getFormattedDate,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ReactionSchema;
