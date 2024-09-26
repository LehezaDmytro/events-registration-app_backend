import express from "express";
const router = express.Router();

import eventsControllers from "../../controllers/events.js";

router.get("/", eventsControllers.getAllEvents);
router.get("/:eventId", eventsControllers.getEventById);
router.patch("/:eventId", eventsControllers.addNewVisitor);

export default router;
