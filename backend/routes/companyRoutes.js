import express from "express";
import CompanyController from "../controllers/CompanyController.js";
import checkAuth from "../middleware/checkAuth.js";

/**
 * Express router object to manage routes.
 * @type {Express.Router}
 */
const router = express.Router();

/**
 * GET route definition for sending an email to a company.
 * @name GET /send-email/:id
 * @function
 * @memberof module:routes
 * @param {string} '/send-email/:id' - The URL path for sending an email to a company.
 * @param {Function} CompanyController.sendEmail - The controller method that handles the route.
 */
router.get('/send-email/:id', CompanyController.preloadEmailForm);
router.post('/send-email/:id', CompanyController.sendEmail);

export default router;
