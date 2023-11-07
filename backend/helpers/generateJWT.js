// Import the 'jsonwebtoken' library, which is used for generating JSON Web Tokens.
import jwt from "jsonwebtoken";

// Define a function called 'genJWT' that takes an 'id' as a parameter.
const genJWT = (id) => {
    // Generate a JWT by signing a payload containing the 'id' using the JWT_SECRET from the environment variables.
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Set the expiration of the JWT to 30 days.
    });
};

export default genJWT;
