import express from 'express';
import { registerUser, loginUser, currentUser } from '../controllers/userControllers.js';
import { validateToken } from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get("/current", validateToken, currentUser);



export default router;