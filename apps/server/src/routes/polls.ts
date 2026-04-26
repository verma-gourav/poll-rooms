import {
  closePoll,
  createPoll,
  getPollById,
  launchPoll,
} from "#/controllers/poll.controller.js";
import { authMiddleware } from "#/middlewares/auth.middleware.js";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

router.post("/", authMiddleware, createPoll);
router.patch("/:id/launch", authMiddleware, launchPoll);
router.patch("/:id/close", authMiddleware, closePoll);
router.get("/:id", getPollById);

export default router;
