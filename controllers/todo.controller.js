import Todo from "../models/Todo.model.js";
import User from "../models/User.model.js";

export const addTodo = async (req, res) => {
    try {
        const { userId, title, text, deadline, completed } = req.body;
        const user = await User.findById({ _id: userId });
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        if (!title || !text || !deadline) {
            res.status(400).json({ message: "Title and text are required" });
        }
        const newTodo = await Todo({
            title,
            text,
            deadline,
            completed: false,
            userId
        })

        await newTodo.save();

        res.status(200).json(newTodo);
    } catch (error) {
        console.log(`Error in addTodo: ${error}`)
        res.status(500).json({ error: error.message });
    }
}

export const markAsDoneAndUnDone = async (req, res) => {
    try {
        const { userId } = req.body;
        // const user = await User.findById(userId);
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id })
        if (!todo) {
            return res.status(404).json({ message: "Todo-item not found" })
        }

        if (todo.userId.toString() !== userId.toString()) {
            return res.status(401).json({ message: "You are not authorized to modify" })
        }

        const currentStauts = todo.completed

        const modifiedTodo = await Todo.findByIdAndUpdate(id, { $set: { completed: !currentStauts } });
        await modifiedTodo.save();

        res.status(200).json({ message: `Marked as Completed(${!modifiedTodo.completed})` });
    } catch (error) {
        console.log(`Error in markAsDoneAndUnDone: ${error}`)
        res.status(500).json({ error: error.message });
    }
}

export const HighPriorityAndNotHighPriority = async (req, res) => {
    try {
        const { userId } = req.body;
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id })
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (!todo) {
            return res.status(404).json({ message: "Todo-item not found" })
        }

        if (todo.userId.toString() !== userId.toString()) {
            return res.status(401).json({ message: "You are not authorized to modify" })
        }

        const currentStatus = todo.priority;

        const modifiedTodo = await Todo.findByIdAndUpdate(id, { $set: { priority: !currentStatus } });
        await modifiedTodo.save();
        res.status(200).json({ message: `Marked as HighPrioriy(${!modifiedTodo.priority})` });
    } catch (error) {
        console.log(`Error in DeleteTodo: ${error}`)
        res.status(500).json({ error: error.message });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { userId } = req.body;
        // const user = await User.findById(userId);
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id })
        if (!todo) {
            return res.status(404).json({ message: "Todo-item not found" })
        }

        if (todo.userId.toString() !== userId.toString()) {
            return res.status(401).json({ message: "You are not authorized to delete" })
        }

        await Todo.findByIdAndDelete(id);

        res.status(200).json({ message: "Todo-item deleted Successfully" });

    }
    catch (error) {
        console.log(`Error in DeleteTodo: ${error}`)
        res.status(500).json({ error: error.message });
    }

}

export const getAllTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const getTodo = await Todo.find({ userId: id })
        res.status(200).json(getTodo);
    } catch (error) {
        console.log(`Error in getAllTodo: ${error}`)
        res.status(500).json({ error: error.message });
    }
}

export const CompletedTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const getTodoCompleted = await Todo.find({ userId: id, completed: true });
        res.status(200).json(getTodoCompleted);
    } catch (error) {
        console.log(`Error in CompletedTodo: ${error}`);
        res.status(500).json({ message: error.message });
    }
}


export const HighPriorityTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const getTodoPriority = await Todo.find({ userId: id, priority: true });
        res.status(200).json(getTodoPriority);
    } catch (error) {
        console.log(`Error in HighPriorityTodo: ${error}`);
        res.status(500).json({ message: error.message });
    }
}

export const InProgressTodo = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const getTodoNotCompleted = await Todo.find({ userId: id, completed: false });
        res.status(200).json(getTodoNotCompleted);
    } catch (error) {
        console.log(`Error in InProgressTodo: ${error}`);
        res.status(500).json({ message: error.message });
    }
}


export const EditTodo = async (req, res) => {
    try {
        const { deadline, text, title, userId } = req.body;
        const { id } = req.params;

        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "item not found" });
        }
        if (todo.userId.toString() !== userId.toString()) {
            return res.status(500).json({ message: "You are not authorized to modify" });
        }
        if (!deadline && !title && !text) {
            return res.status(200).json({ message: "No changes made" });
        }

        todo.deadline = deadline || todo.deadline
        todo.text = text || todo.text
        todo.title = title || todo.title

        await todo.save();

        res.status(200).json({ message: "Updated Successfully" })


    }
    catch (error) {
        console.log(`Error in EditTodo: ${error}`);
        res.status(500).json({ message: error.message });
    }
}