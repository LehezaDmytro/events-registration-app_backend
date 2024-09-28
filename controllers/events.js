import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import Event from "../models/event.js";

const getAllEvents = async (req, res) => {
  const { page = 1, limit = 6, sort = "asc", sortBy = "none" } = req.query;
  const skip = (page - 1) * limit;

  const count = await Event.countDocuments();

  const sortOrder = sort === "desc" ? -1 : 1;

  const sortOptions = {};
  if (sortBy === "title" || sortBy === "date" || sortBy === "organizer") {
    sortOptions[sortBy] = sortOrder;
  }

  const result = await Event.find({}, "", {
    skip,
    limit,
    sort: sortOptions,
  });

  if (result.length === 0) {
    res.json({
      data: [],
      total: count,
    });
  } else {
    res.json({
      data: result,
      total: count,
    });
  }
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
