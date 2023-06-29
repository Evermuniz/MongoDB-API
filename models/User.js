const { Schema, Types } = require("mongoose");


const UserSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        required,
        unique: true,
        match: [/.+@.+\..+/],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model("User", UserSchema);

module.exports = User;
