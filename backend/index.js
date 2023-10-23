import express from "express";
import index from "./routes/index.js";
import conectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

conectDB();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Consult the API
      callback(null, true);
    } else {
      // Error
      callback(new Error("Error of Cors"));
    }
  },
};

app.use(cors());//corsOptions));

app.use('/api/candidates', index);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on: ${process.env.PORT}`);
});
