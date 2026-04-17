import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "#/lib/auth.js";
import roomRouter from "#/routes/rooms.js";
import { createServer } from "http";

const app = express();

app.all("/api/v1/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1/rooms", roomRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const server = createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
