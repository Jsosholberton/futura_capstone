import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the URL provided in the MONGO_URI environment variable.
 * @async
 * @function
 * @throws {Error} If the connection to the database fails
 * @returns {void}
 */
const conectDB = async () => {
    try {
        // Attempts to establish a connection to MongoDB using the specified URL and options.
        const conecction = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true
        }
        );

        // Gets the host and port information of the connection.
        const url = `${conecction.connection.host}:${conecction.connection.port}`;
        console.log(`MongoDB connected on: ${url}`)
    } catch (err) {
        // Captures any errors that occur during the connection and displays an error message.
        console.log(`error: ${err.message}`);
        process.exit(1);
    }
}

// Exports the connectDB function so that it can be used in other modules.
export default conectDB
