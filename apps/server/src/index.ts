import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "#/lib/auth.js";
import roomRouter from "#/routes/rooms.js";
import { createServer } from "http";
import { globalErrorHandler } from "#/middlewares/error.middleware.js";

const app = express();

app.all("/api/v1/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/rooms", roomRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(globalErrorHandler);

const server = createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
