import express from 'express';
import { register, saveRefUser } from '../controllers/bot.controller.js';

var router = express.Router();

router.post("/register", register)
router.post("/saveRefUser", saveRefUser)

export default router;
