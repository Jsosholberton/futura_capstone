import express from "express";
import { register, authenticate, confirm, lostPwd, checkToken, newPwd, profile } from '../controllers/UserController.js';
import checkAuth from '../middleware/checkAuth.js';

/**
 * Express router object to manage user routes.
 * @type {Express.Router}
 */
const router = express.Router();

// Authentication, registration, and user confirmation
/**
 * POST route to register a new user.
 * @name POST /
 * @function
 * @memberof module:routes
 * @param {Function} register - Controller for user registration.
 */
router.post('/', register);

/**
 * POST route to authenticate a user.
 * @name POST /login
 * @function
 * @memberof module:routes
 * @param {Function} authenticate - Controller for user authentication.
 */
router.post('/login', authenticate);

/**
 * GET route to confirm a user's account using a token.
 * @name GET /confirm/:token
 * @function
 * @memberof module:routes
 * @param {string} '/confirm/:token' - The URL path to confirm the user's account.
 * @param {Function} confirm - Controller for user account confirmation.
 */
router.get('/confirm/:token', confirm);

/**
 * POST route to request a password reset.
 * @name POST /lost-password
 * @function
 * @memberof module:routes
 * @param {Function} lostPwd - Controller for requesting a password reset.
 */
router.post('/lost-password', lostPwd);

/**
 * GET route to verify a password reset token.
 * @name GET /lost-password/:token
 * @function
 * @memberof module:routes
 * @param {string} '/lost-password/:token' - The URL path to verify the password reset token.
 * @param {Function} checkToken - Controller for verifying the password reset token.
 */
router.get('/lost-password/:token', checkToken);

/**
 * POST route to set a new password after verifying the token.
 * @name POST /lost-password/:token
 * @function
 * @memberof module:routes
 * @param {string} '/lost-password/:token' - The URL path to set a new password.
 * @param {Function} newPwd - Controller for setting a new password.
 */
router.post('/lost-password/:token', newPwd);

/**
 * GET route to access the user's profile (requires authentication).
 * @name GET /profile
 * @function
 * @memberof module:routes
 * @param {Function} checkAuth - Middleware to verify user authentication.
 * @param {Function} profile - Controller for accessing the user's profile.
 */
router.get('/profile', checkAuth, profile);

export default router;
