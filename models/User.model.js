import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true,
    },
    todo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo",
            default: [],
        }
    ]
}, { timestamps: true })


const User = mongoose.model('User', userSchema)

export default User;