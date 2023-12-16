import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
  currentUserId: {
    type: String,
    required: true,
  },
  accountUserId: {
    type: String,
    required: true,
  },
});

const Follower =
  mongoose.models.Follower || mongoose.model("Follower", followerSchema);

export default Follower;
