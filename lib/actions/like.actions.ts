"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Like from "../models/like.model";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// SAVE A LIKE IN THE DATABASE //////////////////////////////////

export async function saveLike(threadId: string, userId: string, path: string) {
  try {
    connectToDB();

    // Check if an instance already exists with the same userId and threadId
    const existingLike = await Like.findOne({ userId, threadId });

    if (existingLike) {
      await Like.findOneAndDelete({ userId, threadId });
      revalidatePath(path);
      // console.log(`Like of thread ${threadId} removed for user ${userId}`);
      return `Like of thread ${threadId} removed for user ${userId}`;
    } else {
      const savedLike = new Like({
        userId: userId,
        threadId: threadId,
      });

      await savedLike.save();
      // console.log(`Successfully saved like ${threadId}`);
      revalidatePath(path);
      return `Successfully saved like ${threadId}`;
    }
  } catch (error) {
    console.error("Error saving like:", error);
    throw error;
  }
}

// COUNT LIKES OF A THREAD /////////////////////////////////////////

export async function countLikes(threadId: string) {
  try {
    connectToDB();

    const likes = await Like.countDocuments({ threadId });
    return likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error;
  }
}

// GET ALL LIKED THREAD IDS /////////////////////////////////////////
export async function getAllLikedThreadIds(userId: string) {
  // console.log(userId);
  try {
    connectToDB();

    const threadIds = await Like.distinct("threadId", {
      userId,
    });
    return threadIds;
  } catch (error) {
    console.error("Error fetching threadIds:", error);
    throw error;
  }
}
