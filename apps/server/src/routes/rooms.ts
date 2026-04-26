import { Router } from "express";
import {
  createRoom,
  getRoomByCode,
  getRoomById,
} from "#/controllers/room.controller.js";
import { authMiddleware } from "#/middlewares/auth.middleware.js";
import pollRouter from "#/routes/polls.js";

const router: Router = Router();

router.post("/", authMiddleware, createRoom);
router.get("/code/:code", getRoomByCode);
router.get("/:id", getRoomById);
router.use("/:roomId/polls", pollRouter);

export default router;
