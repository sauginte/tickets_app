import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  fromLocation: { type: String, required: true, min: 3 },
  toLocation: { type: String, required: true, min: 3 },
  toLocationPhotoUrl: { type: String, required: true },
  isPurchased: { type: Boolean, required: true },
});

export default mongoose.model("Ticket", ticketSchema);
