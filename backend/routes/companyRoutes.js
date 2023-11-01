import express from "express";
import CompanyController from "../controllers/CompanyController.js";
import checkAuth from "../middleware/checkAuth.js";

// Express router object to manage routes
const router = express.Router();

// GET route definition for URL '/send-email/:id'
router.get('/send-email/:id', CompanyController.sendEmail) // checkAuth,


export default router;
