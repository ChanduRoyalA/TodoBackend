import express from 'express';
import { addTodo, markAsDoneAndUnDone, deleteTodo, getAllTodo, CompletedTodo, HighPriorityTodo, InProgressTodo, HighPriorityAndNotHighPriority, EditTodo } from '../controllers/todo.controller.js';


const router = express.Router();


router.post('/addTodo', addTodo);
router.post('/markAsDoneAndUnDone/:id', markAsDoneAndUnDone);
router.post('/highPrioritNotHighPriority/:id', HighPriorityAndNotHighPriority);
router.delete('/deleteTodo/:id', deleteTodo);
router.post('/getAllTodo', getAllTodo);
router.post('/getCompletedTodo', CompletedTodo);
router.post('/getHighPriorityTodo', HighPriorityTodo);
router.post('/getInProgressTodo', InProgressTodo);
router.post('/editTodo/:id', EditTodo)

export default router;