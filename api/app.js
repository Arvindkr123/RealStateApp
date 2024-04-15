import express from "express";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/post", postRoutes);

app.listen(4000, async () => {
  console.log("server listening on http://localhost:4000");
});
