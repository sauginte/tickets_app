import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, min: 6 },
  boughtTickets: { type: [String] },
  moneyBalance: { type: Number, required: true },
});

export default mongoose.model("User", userSchema);
