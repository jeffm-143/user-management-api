import express from "express";
import "reflect-metadata";
import userRoutes from "./routes/user";
import { AppDataSource } from "./config/data-source"; 

const app = express();
app.use(express.json()); 
app.use("/users", userRoutes); 

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
