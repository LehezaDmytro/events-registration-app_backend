import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import Event from "../models/event.js";

const getAllEvents = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  const count = (await Event.find()).length;

  const result = await Event.find({}, "", {
    skip,
    limit,
  });

  if (result.length === 0) {
    throw HttpError(404, "Not found");
  }

  res.json({
    data: result,
    total: count,
  });
};

const getEventById = async (req, res) => {
  const { eventId } = req.params;
  const result = await Event.findById(eventId);
  if (!result) {
    throw HttpError(404, `Event width id:${eventId} not found`);
  }
  res.json(result);
};

const addNewVisitor = async (req, res) => {
  const { eventId } = req.params;
  const newVisitor = req.body;
  const result = await Event.findById(eventId);
  if (!result) {
    throw HttpError(404, `Event width id:${eventId} not found`);
  }
  result.visitors.push(newVisitor);
  result.save();
  res.json(result);
};

export default {
  getAllEvents: ctrlWrapper(getAllEvents),
  getEventById: ctrlWrapper(getEventById),
  addNewVisitor: ctrlWrapper(addNewVisitor),
};
