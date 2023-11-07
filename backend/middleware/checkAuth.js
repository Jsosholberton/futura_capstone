// Import the 'jsonwebtoken' library, which is used for generating JSON Web Tokens.
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Define a middleware function called 'checkAuth' to handle authentication.
const checkAuth = async (req, res, next) => {
    let token;

    // Check if the request's headers contain a bearer token (JWT).
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {

        // Extract the token from the authorization header.
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify and decode the JWT using the JWT_SECRET from environment variables.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user associated with the decoded 'id' and exclude sensitive information.

            req.user = await User.findById(decoded.id).select("-password -confirm -token -createdAt -updatedAt -__v");
            // Continue to the next middleware or route.
            return next();
        } catch (err) {

            // If there is an error during token verification, return an error response.
            return res.status(404).json({msg: "Something was wrong!"});
        }
    };

    // If no token is found, return an error response indicating an invalid token.
    if (!token) {
        const error = new Error("Invalid Token");
        return res.status(401).json({msg: error.message});
    }

    // Continue to the next middleware or route.
    next();
}

export default checkAuth;
