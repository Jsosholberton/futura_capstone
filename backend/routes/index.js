import express from "express";
import DataController from "../controllers/DataController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get('/process/:id', DataController.updateNotionData) // checkAuth,

export default router;
