import express from "express"; // Express.js for building the API
import index from "./routes/index.js"; // Import the index route
import conectDB from "./config/db.js"; // Import a function for connecting to a database
import userRoutes from "./routes/userRoutes.js"; // Import user-related routes
import cors from "cors"; // Middleware for handling CORS
import dotenv from "dotenv"; // Load environment variables from a .env file
import companyRoutes from "./routes/companyRoutes.js" // Import company-related routes

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(express.json()); // Parse JSON request bodies

// Connect to the database using the provided function
conectDB();

// Define a whitelist of allowed origins for CORS
const whitelist = [process.env.FRONTEND_URL];

// Configure CORS options to control cross-origin access
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Allow the request to proceed if the origin is in the whitelist
      callback(null, true);
    } else {
      // Reject the request with an error if the origin is not in the whitelist
      callback(new Error("Error of Cors"));
    }
  },
};

// Enable CORS for the Express app, allowing requests from specified origins
app.use(cors());//corsOptions));

// Define routes for different parts of the application
app.use('/api/candidates', index); // Use the 'index' route for candidates
app.use('/api/users', userRoutes); // Use the 'userRoutes' for user-related routes
app.use('/api/companies', companyRoutes); // Use 'companyRoutes' for company-related routes

// Start the Express app and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server running on: ${process.env.PORT}`);
});
