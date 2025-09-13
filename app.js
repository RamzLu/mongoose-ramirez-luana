import express from "express";
import "dotenv/config";
import { conectDB } from "./src/config/database.js";
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await conectDB();
  console.log(`Server is running on port ${PORT}`);
});
