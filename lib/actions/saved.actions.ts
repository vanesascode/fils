"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import Saved from "../models/saved.model";

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

export async function getCompleteThreadsfromThreadsIds(threadIds: string[]) {
  try {
    const threads: Thread[] = [];
    const populatedThreads = await Thread.find({ _id: { $in: threadIds } })
      .populate("author", ["username", "name", "image"])
      .populate("community", ["id", "name", "image"])
      .sort({ createdAt: -1 })
      .exec();

    populatedThreads.forEach((thread: any) => {
      threads.push({
        _id: thread._id,
        text: thread.text,
        author: {
          _id: thread.author._id,
          username: thread.author.username,
          name: thread.author.name,
          image: thread.author.image,
        },
        parentId: thread.parentId,
        community: {
          id: thread.community?.id,
          name: thread.community?.name,
          image: thread.community?.image,
        },
        createdAt: thread.createdAt,
        children: thread.children.map((child: any) => ({
          author: {
            image: child.author?.image,
          },
        })),
        likes: thread.likes,
      });
    });

    return threads;
  } catch (error) {
    console.error("Error fetching replies:", error);
    throw error;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

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
      console.log(`Thread ${threadId} already saved for user ${userId}`);
      return `Thread ${threadId} already saved for user ${userId}`;
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

///////////////////////////////////////////////////////////////////////////////////////////////////////

// TO REMOVE THE FAVOURITE (SAVED ) THREADS OF A USER

export async function unSaveThread(
  threadId: string,
  userId: string,
  path: string
) {
  // console.log("threadid getting to the saveThread function:", threadId);
  // console.log("userid getting to the saveThread function:", userId);

  try {
    connectToDB();

    // Check if an instance already exists with the same userId and threadId
    const existingThread = await Saved.findOneAndRemove({ userId, threadId });

    if (existingThread) {
      console.log(`Successfully unsaved thread ${threadId}`);
      revalidatePath(path);
      return `Successfully unsaved thread ${threadId}`;
    } else {
      console.log(`Thread ${threadId} is not saved for user ${userId}`);
    }
  } catch (error) {
    console.error("Error saving thread:", error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
