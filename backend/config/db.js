import mongoose from 'mongoose';

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the provided URI
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        });

        // If the connection is successful, get the host and port and log a success message
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB connected on: ${url}`);
    } catch (err) {
        // If there's an error during the connection attempt, log the error message and exit the process
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit with a failure code
    }
}

export default connectDB; // Export the connectDB function
