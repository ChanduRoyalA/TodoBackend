import mongoose from "mongoose";

const todo = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        req: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: "Todo text"
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Todo = mongoose.model('Todo', todo);

export default Todo;