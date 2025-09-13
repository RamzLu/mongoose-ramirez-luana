import express from "express";
import "dotenv/config";
import { conectDB } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { TagModel } from "./src/models/tag.model.js";
import { PostModel } from "./src/models/post.model.js";
import { userRoute } from "./src/routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api", userRoute);

app.listen(PORT, async () => {
  await conectDB();
  console.log(`Server is running on port ${PORT}`);
});
