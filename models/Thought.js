const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");
const { getFormattedDate } = require("../utils/date");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("createdAt").get(getFormattedDate);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
