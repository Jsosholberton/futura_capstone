// Import the 'jsonwebtoken' library, which is used for generating JSON Web Tokens.
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to check the user's authentication using a JSON Web Token (JWT).
 * @function
 * @async
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware or route handler function.
 */
const checkAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify the JWT token using the JWT_SECRET from environment variables
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user associated with the decoded 'id' and exclude sensitive information.

            // Retrieve the user associated with the token and exclude sensitive information
            req.user = await User.findById(decoded.id).select("-password -confirm -token -createdAt -updatedAt -__v");
            // Continue to the next middleware or route.
            return next();
        } catch (err) {
            return res.status(404).json({ msg: "Something went wrong!" });
        }
    }

    if (!token) {
        const error = new Error("Invalid Token");
        return res.status(401).json({ msg: error.message });
    }

    next();
};

export default checkAuth;
