import express from 'express'
import { login, register } from '../controllers/userControllers.js';

let router =express.Router();

//http://localhost:5000/api/v1/user/register
router.post("/register",register);
router.post("/login",login);


export default router;