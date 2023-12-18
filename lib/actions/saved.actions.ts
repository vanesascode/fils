"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import Saved from "../models/saved.model";
import User from "../models/user.model";

////////// getCompleteThreadsfromThreadsIds ///////////////////////////////////////////////////////

interface Thread {
  _id: string;
  text: string;
  author: {
    _id: string;
    username: string;
    name: string;
    image: string;
  };
  parentId?: string | null;
  community?: { id: string; name: string; image: string } | string | null;
  createdAt: Date;
  children: { author: { image: string } }[];
  likes: number;
}

///////////////////////////////////////////////////////////////////////////////////////

// TO SAVE THE FAVOURITE (SAVED ) THREADS OF A USER

export async function saveThread(
  threadId: string,
  userId: string,
  path: string
) {
  // console.log("threadid getting to the saveThread function:", threadId);
  // console.log("userid getting to the saveThread function:", userId);

  try {
    connectToDB();

    // Check if an instance already exists with the same userId and threadId
    const existingThread = await Saved.findOne({ userId, threadId });

    if (existingThread) {
      await Saved.findOneAndDelete({ userId, threadId });
      revalidatePath(path);
      console.log(
        `Thread ${threadId} for user ${userId} was deleted from saved list`
      );
      return `Thread ${threadId} for user ${userId} was deleted from saved list`;
    } else {
      const savedThread = new Saved({
        userId: userId,
        threadId: threadId,
      });

      await savedThread.save();
      console.log(`Successfully saved thread ${threadId}`);
      revalidatePath(path);
      return `Successfully saved thread ${threadId}`;
    }
  } catch (error) {
    console.error("Error saving thread:", error);
    throw error;
  }
}

///////////////////////////////////////////////////////////////////////////////////////

export async function fetchSavedThreadsIds(userId: string) {
  try {
    const savedDocuments = await Saved.find({ userId });
    const threadIds = savedDocuments.map(
      (savedDocument) => savedDocument.threadId
    );
    return threadIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// COUNT SAVES OF A THREAD /////////////////////////////////////////

export async function countSaves(threadId: string) {
  try {
    connectToDB();

    const saves = await Saved.countDocuments({ threadId });
    return saves;
  } catch (error) {
    console.error("Error fetching saves:", error);
    throw error;
  }
}

///////////////////

export async function getSavedPosts(userId: string) {
  try {
    connectToDB();

    // Collect all instances related to the logged in user:
    const savedinstances = await Saved.find({ userId });

    // Collect all the thread ids from all the instances and put them into an array
    const savedThreadsIds = savedinstances.reduce((acc, savedinstance) => {
      return acc.concat(savedinstance.threadId);
    }, []);

    console.log("savedThreadsIds", savedThreadsIds);

    const savedThreads = await Thread.find({
      _id: { $in: savedThreadsIds },
    })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate({
        path: "author",
        model: User,
        select: "name image _id id",
      })
      .populate({
        path: "children",
        model: Thread,
        select: "author",
        populate: {
          path: "author",
          model: User,
          select: "image",
        },
      });

    return savedThreads;
  } catch (error) {
    console.error("Error fetching saves:", error);
    throw error;
  }
}
