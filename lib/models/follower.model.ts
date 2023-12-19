import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
  currentUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Follower =
  mongoose.models.Follower || mongoose.model("Follower", followerSchema);

export default Follower;
