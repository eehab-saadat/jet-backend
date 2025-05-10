import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jetRoutes from "./routes/jetRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb://localhost:27017/fighter-jets").then(() => {
//     console.log(">> Connected to MongoDB");
// }).catch((err) => {
//     console.log(">> Error connecting to MongoDB", err);
// });

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log(">> Connected to MongoDB");
}).catch((err) => {
    console.log(">> Error connecting to MongoDB", err);
});

app.use("/api/jets", jetRoutes);

app.listen(3000, () => {
    console.log(">> Server is running at http://localhost:3000");
});

import os from "os";

const interfaces = os.networkInterfaces();

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    // Skip over internal (i.e., 127.0.0.1) and non-IPv4 addresses
    if (iface.family === 'IPv4' && !iface.internal) {
      console.log(`Interface: ${name}`);
      console.log(`IP Address: ${iface.address}`);
    }
  }
}
