"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";
import Saved from "../models/saved.model";

// Several functions related to fetching and updating the user data without needing an endpoint in the api folder:

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  //POPULATION is a powerful feature in Mongoose that simplifies working with related documents. It helps in reducing the need for additional queries and provides a convenient way to retrieve the data you need from different collections in a single query.

  // Count the total number of top-level posts (threads) i.e., threads that are not comments:
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts that are not comments

  const posts = await postsQuery.exec();

  //If the total count is greater than the skip amount and the lenght of the current posts array, it means that there are more posts available beyond the retrieved posts in the current page. In this case, the isNext variable will be set to true, indicating that there are more posts to fetch in the next page:
  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function fetchThreadIDs(): Promise<string[]> {
  connectToDB();

  const threadIDs = await Thread.find().distinct("_id");

  return threadIDs;
}

// 2 - CREATE THREADS ////////////////////////////////////////////////////////////////////////////////////////////////

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 } // only the _id field should be returned in the result.
    );

    console.log(communityId);

    const createdThread = await Thread.create({
      text,
      author,
      community: communityIdObject,
    });

    // Update User model with a particular user's own Threads
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createdThread._id },
      });
    } else {
      console.log("Community not found");
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

// 3 - FETCH ALL CHILD THREADS ///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

// 4 - DELETE THREAD ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// 5 - FETCH A THREAD ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// 6 - ADD COMMENT TO THREAD ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// 7 - UPDATE POST  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// 7 - UPDATE LIKES OF THREAD ////////////////////////////////////////////////////////////////////////////////////////////

// export async function updateThreadLikes(threadId: string, likes: number) {
//   try {
//     connectToDB();

//     await Thread.findOneAndUpdate(
//       { id: threadId },

//       { likes }
//     );
//   } catch (error: any) {
//     throw new Error(`Failed to create/update user: ${error.message}`);
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////REPLIES TAB:

export async function getAllThreadsByUserId(userId: string) {
  try {
    connectToDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const threads = [];
    for (const threadId of user.threads) {
      const thread = await Thread.findOne({ _id: threadId });
      if (thread) {
        threads.push(thread);
      }
    }

    return threads;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////REPLIES TAB:

export async function fetchThreadsWithChildren(threadIds: string[]) {
  try {
    connectToDB();
    const threadsWithChildren = await Thread.find({
      _id: { $in: threadIds },
    }).populate("children");

    if (!threadsWithChildren || threadsWithChildren.length === 0) {
      throw new Error("No threads found with the provided IDs");
    }

    return threadsWithChildren;
  } catch (error) {
    console.error("Error fetching children of threads:", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////REPLIES TAB

// interface Thread {
//   _id: string;
//   text: string;
//   author: string;
//   parentId?: string | null;
//   community?: string | null;
//   createdAt: Date;
//   children: Thread[] | null;
//   likes: number;
// }

// export async function getCompleteThreadsfromChildren(threadIds: string[]) {
//   try {
//     const threads: Thread[] = [];
//     for (const threadId of threadIds) {
//       const thread = await Thread.findById(threadId);
//       if (thread) {
//         threads.push(thread);
//       }
//     }
//     return threads;
//   } catch (error) {
//     console.error("Error fetching replies:", error);
//     throw error;
//   }
// }

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
  community?: string | null;
  createdAt: Date;
  children: Thread[] | null;
  likes: number;
}

export async function getCompleteThreadsfromThreadsIds(threadIds: string[]) {
  try {
    const threads: Thread[] = [];
    const populatedThreads = await Thread.find({ _id: { $in: threadIds } })
      .populate("author", ["username", "name", "image"])
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
        community: thread.community,
        createdAt: thread.createdAt,
        children: thread.children,
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// TO GET THE FAVOURITE (SAVED ) THREADS OF A USER

// export async function fetchSavedThreads(userId: string) {
//   try {
//     const savedDocuments = await Saved.find({ userId });
//     const threadIds = [];
//     for (const savedDocument of savedDocuments) {
//       threadIds.push(savedDocument.threadId);
//     }

//     const threads = [];
//     for (const threadId of threadIds) {
//       const thread = await Thread.findOne({ _id: threadId });
//       if (thread) {
//         threads.push(thread);
//       }
//     }

//     return threads;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

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
