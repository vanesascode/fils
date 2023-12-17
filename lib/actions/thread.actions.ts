"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";
import Saved from "../models/saved.model";
import Like from "../models/like.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// THREADS //////////////////////////////////////////////////////////

// 1 - FETCH THREADS & implement the pagination /////////////////////////////////////////////////////////////

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  //SQL: The OFFSET clause is used in conjunction with the LIMIT clause to skip a specified number of rows in a query result. It allows you to retrieve a subset of rows from a query, starting from a specific position.

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply):
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "community",
      model: Community,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments:
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts that are not comments

  const posts = await postsQuery.exec();

  //If the total count is greater than the skip amount and the lenght of the current posts array, it means that there are more posts available beyond the retrieved posts in the current page. In this case, the isNext variable will be set to true, indicating that there are more posts to fetch in the next page:
  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

// 2 - CREATE THREADS ////////////////////////////////////////////////////////////////////////

interface Params {
  text: string;
  author: string;
  // communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  // communityId,
  path,
}: Params) {
  try {
    connectToDB();

    // const communityIdObject = await Community.findOne(
    //   { id: communityId },
    //   { _id: 1 } // only the _id field should be returned in the result.
    // );

    // console.log(communityId);

    const createdThread = await Thread.create({
      text,
      author,
      // community: communityIdObject,
    });

    // Update User model with a particular user's own Threads
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    // if (communityIdObject) {
    //   // Update Community model
    //   await Community.findByIdAndUpdate(communityIdObject, {
    //     $push: { threads: createdThread._id },
    //   });
    // } else {
    //   console.log("Community not found");
    // }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

// 3 - FETCH ALL CHILD THREADS ///////////////////////////////////////////////////////////////////////

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

// 4 - DELETE THREAD /////////////////////////////////////////////////////////////////////////////

export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Find the thread to be deleted (the main thread)
    const mainThread = await Thread.findById(id).populate("author community");

    if (!mainThread) {
      throw new Error("Thread not found");
    }

    // Fetch all child threads and their descendants recursively
    const descendantThreads = await fetchAllChildThreads(id);

    // Get all descendant thread IDs including the main thread ID and child thread IDs
    const descendantThreadIds = [
      id,
      ...descendantThreads.map((thread) => thread._id),
    ];

    // Extract the authorIds and communityIds to update User and Community models respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.community?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    // Recursively delete child threads and their descendants
    await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    // Update Community model
    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}

// 5 - FETCH A THREAD //////////////////////////////////////////////////////////////////////////////

export async function fetchThreadById(threadId: string) {
  connectToDB();

  try {
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}

// 6 - ADD COMMENT TO THREAD ////////////////////////////////////////////////////////////////////////////

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    //The revalidatePath(path) function tells the website to remove the cached version of that specific page and fetch the latest version from the server.
    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}

// 7 - UPDATE POST  ///////////////////////////////////////////////////////////////////////////

// export const updateThread = async ({
//   threadId,
//   likes,
//   userId,
// }: {
//   threadId: string;
//   likes: number;
//   userId: string;
// }) => {
//   // Find the current user
//   const currentUser = await User.findOne({ id: userId });

//   // Check if the thread is already liked by the user
//   const isLiked = currentUser.likedThreads.includes(threadId);

//   // If the thread is liked and the user unlikes it, remove the thread ID from the likedThreads array
//   if (isLiked && likes === 0) {
//     currentUser.likedThreads = currentUser.likedThreads.filter(
//       (id: string) => id !== threadId
//     );
//   }
//   // If the thread is not liked and the user likes it, add the thread ID to the likedThreads array
//   else if (!isLiked && likes > 0) {
//     currentUser.likedThreads.push(threadId);
//   }

//   // Save the updated user
//   await currentUser.save();
// };

////////REVISE ////???????//////////////////////////////////////////////////////////////////

export async function fetchThreadIDs(): Promise<string[]> {
  connectToDB();

  const threadIDs = await Thread.find().distinct("_id");

  return threadIDs;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
