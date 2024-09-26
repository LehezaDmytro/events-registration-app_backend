import { Schema, model } from "mongoose";

const visitor = new Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    birthDate: { type: String, required: [true, "Birthd date is required"] },
    source: { type: String, required: [true, "Source is required"] },
  },
  { versionKey: false }
);

const eventSchema = new Schema(
  {
    title: String,
    description: String,
    date: String,
    organizer: String,
    visitors: [visitor],
  },
  { versionKey: false }
);

const Event = model("event", eventSchema);

export default Event;
