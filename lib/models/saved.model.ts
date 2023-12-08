import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Saved = mongoose.models.Saved || mongoose.model("Saved", savedSchema);

export default Saved;
