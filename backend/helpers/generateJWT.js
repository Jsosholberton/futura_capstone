// Import the 'jsonwebtoken' library, which is used for generating JSON Web Tokens.
import jwt from "jsonwebtoken";

/**
 * Generates a JWT token (JSON Web Token) using the provided ID and JWT secret key.
 * @param {string} id - Unique identifier associated with the user for which the token is generated.
 * @returns {string} - Generated JWT token.
 */
const genJWT = (id) => {
    // Generate a JWT by signing a payload containing the 'id' using the JWT_SECRET from the environment variables.
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // The token will expire in 30 days
    });
};

/**
 * Exports the genJWT function as the default value of the module.
 */
export default genJWT;
