import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";

import Likes from "../Likes";
import SaveThread from "../forms/SaveThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;

  author: {
    name: string;
    image: string;
    id: string;
  };

  community: {
    id: string;
    name: string;
    image: string;
  } | null;

  createdAt: string;

  //the children:
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;

  threadId?: string | null | undefined;
}

//All these props come from the 'Home Page' (using the 'fetchPosts' action) or the Thread page (using the 'fetchThreadById' action)
async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  / /; //////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-light-1 p-7 box-shadow-big"
      }`}
    >
      {/*ALL CARDS********************************************************************************************************************************************/}

      {/*PROFILE IMAGE */}

      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              {/* See that is it not '_id', but 'id'. So, it is the Clerk id! */}
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full object-cover "
              />
            </Link>

            {/*THE VERTICAL LINE */}

            {/* a line pointing down that indicates that we can have later on more comments attached to this thread: */}
            <div
              className={`thread-card_bar ${
                isComment ? "bg-light-1" : "bg-dark-1"
              }`}
            />
          </div>

          {/*THE USERNAME */}

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4
                className={`cursor-pointer ${
                  isComment ? "text-base-bold" : "text-base-semibold"
                } text-dark-1`}
              >
                {author.name}
              </h4>
            </Link>

            {/*THE TEXT OF THE THREAD */}

            <p
              className={`mt-2 text-small-regular ${
                isComment ? "text-light-1" : "text-dark-1"
              }`}
            >
              {content}
            </p>

            {/*THE FOUR ICONS  */}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-5">
                {/* LIKES */}
                <Image
                  src={
                    isComment
                      ? "/assets/heart-white.svg"
                      : "/assets/heart-black.svg"
                  }
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                {/* <Likes
                  threadsWithIDs={threadsWithIDs}
                  userId={author.id}
                  likes={likes}
                /> */}

                {/*REPLIES */}
                <Link href={`/thread/${id}`}>
                  <Image
                    src={
                      isComment
                        ? "/assets/reply-white.svg"
                        : "/assets/reply-black.svg"
                    }
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>

                {/*SHARE THREAD ICON */}

                <Image
                  src={
                    isComment
                      ? "/assets/share-white.svg"
                      : "/assets/share-black.svg"
                  }
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />

                {/*SAVE THREAD ICON */}
                <SaveThread
                  isComment={isComment}
                  threadId={id}
                  currentUserId={currentUserId}
                />
              </div>
              {!community && isComment && (
                <p className="text-subtle-medium text-light-1 mt-5">
                  {formatDateString(createdAt)}
                </p>
              )}

              {/*DEPENDING WHETHER IT IS ORIGINAL OR COMMENT**********************************************************************************************************/}

              {/*THE NUMBER OF REPLIES IF IT IS A COMMENT*/}

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-light-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {/*THE NUMBER OF REPLIES IF IT IS AN ORIGINAL THREAD*/}

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-dark-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {/*DATE OF ORIGINAL THREAD*/}

      {!community && !isComment && (
        <p className="text-subtle-medium text-light-2 mt-5">
          {formatDateString(createdAt)}
        </p>
      )}

      {/*THE COMMUNITY IF IT IS AN ORIGINAL THREAD*/}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-light-2">
            {formatDateString(createdAt)}
            <span className="text-dark-1 ms-2">
              {" "}
              {community && `  ${community.name} Community`}
            </span>
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={20}
            height={20}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
