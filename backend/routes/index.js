import express from "express";
import DataController from "../controllers/DataController.js";
import checkAuth from "../middleware/checkAuth.js";

/**
 * Express router object to manage routes.
 * @type {Express.Router}
 */
const router = express.Router();

/**
 * Definition of a GET route for processing data in Notion with a specific identifier.
 * @name GET /process/:id
 * @function
 * @memberof module:routes
 * @param {string} '/process/:id' - The URL path for processing data in Notion with a specific identifier.
 * @param {Function} DataController.updateNotionData - The controller method that handles the route.
 */
router.get('/process/:id', DataController.updateNotionData);

export default router;
