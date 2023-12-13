import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  likedThreads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// The mongoose.models.User property checks if a model with the name "User" already exists, and if so, assigns it to the User variable. If no such model exists, the mongoose.model("User", userSchema) method creates a new model with the name "User" and the userSchema as its schema.

// for the first time the Mongoose models is not going to exist so it's going to fall back to creating a mongoose model user based on the user schema. But every second time we call it it's already going to have a mongoose model in the database.

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
