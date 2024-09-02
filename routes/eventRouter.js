// イベントルーターの管理
import { Router } from "express";
const eventRouter = Router();

import { getAllEvents, getEvent, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { validateEventInput, validateIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

eventRouter.route("/").get(getAllEvents).post(checkForTestUser, validateEventInput, createEvent);
eventRouter.route("/:id").get(validateIdParam, getEvent).patch(checkForTestUser, validateEventInput, validateIdParam, updateEvent).delete(checkForTestUser, validateIdParam, deleteEvent);

export default eventRouter;
