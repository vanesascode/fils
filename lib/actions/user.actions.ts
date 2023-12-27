"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import Like from "../models/like.model";
import Saved from "../models/saved.model";
import Follower from "../models/follower.model";

import { connectToDB } from "../mongoose";

// UPDATE USER - Once they have logged in and go to the Onboarding Form /////////////////////////

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  email: string;
}

// the order of the name, path, username, userId, bio, and image values in the object passed to the updateUser function does not matter. The function is designed to extract those values from the object and use them in the correct order, regardless of the order in which they were passed.

// This is because the function is using object destructuring to extract the values of those properties from the object. Object destructuring allows you to extract values from objects by specifying the property names you want to extract, and the order of the property names in the destructuring statement does not matter.

export async function updateUser({
  userId,
  bio,
  name,
  username,
  image,
  email,
}: Params): Promise<void> {
  // no username with spaces can be saved in the database

  try {
    connectToDB();
    // Check if the username already exists
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (/\s/.test(username)) {
      return;
    }

    if (existingUser) {
      throw new Error(
        "This username is already taken. Please choose a different one."
      );
    }

    await User.findOneAndUpdate(
      { id: userId },

      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        email,
        onboarded: true,
      },

      { upsert: true } //The upsert: true option ensures that a new document is created if no matching document is found.
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

//The findOneAndUpdate method is a Mongoose method that is used to find a document in a MongoDB collection and update it. It takes three arguments: the first argument is an object that specifies the query to find the document to update, the second argument is an object that specifies the properties to update, and the third argument is an options object that specifies additional options for the update operation.

// UPDATE USER - when changing profile info in profileHeader /////////////////////////

interface ParamsInProfile {
  userId: string;
  username?: string;
  name: string;
  bio: string;
  image: string;
}

export async function updateUserInProfile({
  userId,
  bio,
  name,
  username,
  image,
}: ParamsInProfile): Promise<void> {
  try {
    connectToDB();
    // Check if the username already exists
    const existingUser = await User.findOne({
      username: username?.toLowerCase(),
    });
    if (existingUser) {
      throw new Error(
        "This username is already taken. Please choose a different one."
      );
    }
    await User.findOneAndUpdate(
      { id: userId },

      {
        username: username?.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },

      { upsert: true } //The upsert: true option ensures that a new document is created if no matching document is found.
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

// DELETE USER ////////////////////////////////////////////////////////////////////////

export async function deleteUser(id: string, path: string) {
  try {
    connectToDB();
    const userId = await getUserId(id);
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    await User.deleteOne({ _id: user._id });

    await Thread.deleteMany({ author: user._id });

    await Like.deleteMany({ userId: user._id });

    await Saved.deleteMany({ userId: user._id });

    await Follower.deleteMany({
      currentUserId: user._id,
      accountUserId: user._id,
    });

    console.log("User and associated threads have been deleted.");

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

// FETCH USER //////////////////////////////////////////////////////////////////////////

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

// FETCH USER POSTS /////////////////////////////////////////////////////////////////////////////

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

// FETCH USERS FOR THE RIGHT SIDEBAR //////////////////////////////////////////////////////////////////

export async function fetchSuggestedUsers({ userId }: { userId: string }) {
  try {
    connectToDB();

    const users = await User.find({ id: { $ne: userId } })
      .sort({ _id: -1 })
      .limit(12);

    return { users };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// FETCH USERS FOR THE SEARCH PAGE //////////////////////////////////////////////////////////////////

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// FETCH FOLLOWERS ///////////////////////////////////////////////////////

export async function fetchFollowers({ userId }: { userId: string }) {
  try {
    connectToDB();

    const followers = await Follower.find({ accountUserId: userId })
      .populate({
        path: "currentUserId",
        model: User,
        select: "name image _id username id",
      })
      .sort({ _id: -1 });

    return followers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// FETCH FOLLOWED USERS  ///////////////////////////////////////////////////////

export async function fetchFollowedUsers({ userId }: { userId: string }) {
  try {
    connectToDB();

    const followed = await Follower.find({ currentUserId: userId })
      .populate({
        path: "accountUserId",
        model: User,
        select: "name image _id username id",
      })
      .sort({ _id: -1 });

    return followed;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// GET ALL FOLLOWED USERS IDS /////////////////////////////////////////
export async function getAllFollowedUsersIds(currentUserId: string) {
  // console.log(currentUserId);
  try {
    connectToDB();

    const userIds = await Follower.find({ currentUserId }).distinct(
      "accountUserId"
    );
    return userIds;
  } catch (error) {
    console.error("Error fetching threadIds:", error);
    throw error;
  }
}

// 5 - GET ACTIVITY ////////////////////////////////////////////////////////////////

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate({
        path: "author",
        model: User,
        select: "name image _id",
      });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}

// 6 - Get user._id thanks to the user.id ////////////////////////////////////////////////////////

export async function getUserId(providedId: string): Promise<string> {
  try {
    await connectToDB();

    const user = await User.findOne({ id: providedId });
    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;
    return userId;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}

////////////////////// REMOVE LIKED THREADS //////////////////////////////////////////////////////////////////

export async function removeLikedThread(threadId: string, userId: string) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      { $pull: { likedThreads: threadId } }
    );
  } catch (error: any) {
    throw new Error(`Failed to remove liked thread: ${error.message}`);
  }
}

///////////////////////// SAVE FOLLOWER //////////////////////////////////////////////////////////////////////////

export async function saveFollower(
  currentUserId: string,
  accountUserId: string,
  path: string
) {
  try {
    connectToDB();

    // Check if an instance already exists with the same userId and threadId
    const existingFollower = await Follower.findOne({
      currentUserId,
      accountUserId,
    });

    if (existingFollower) {
      await Follower.findOneAndDelete({ currentUserId, accountUserId });
      revalidatePath(path);
      // console.log(`Unfollowed`);
      return `Unfollowed`;
    } else {
      const savedFollower = new Follower({
        currentUserId: currentUserId,
        accountUserId: accountUserId,
      });

      await savedFollower.save();
      console.log(`Successfully saved new user followed`);
      revalidatePath(path);
      return `Successfully saved new user followed`;
    }
  } catch (error) {
    console.error("Error saving followed user:", error);
    throw error;
  }
}
