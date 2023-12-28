"server side rendering";

import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import Likes from "../forms/Likes";
import SaveThread from "../forms/SaveThread";
import { getUserId } from "@/lib/actions/user.actions";
import { countLikes, getAllLikedThreadIds } from "@/lib/actions/like.actions";
import { countSaves, getAllSavedThreadIds } from "@/lib/actions/saved.actions";
import ThreadCardOptions from "../forms/ThreadCardOptions";
import ThreadText from "./ThreadText";
import DeleteThread from "../forms/DeleteThread";

interface Props {
  id: string;
  currentUserId: string;
  content: string;
  parentId: string | null | undefined;
  author: {
    name: string;
    image?: string;
    id: string;
  };
  createdAt: string;
  //the children:
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

async function ThreadCard({
  id, // thread._id
  currentUserId, //
  parentId, //
  content,
  author, //author.id
  createdAt,
  comments,
  isComment, //
}: Props) {
  const userId = await getUserId(currentUserId); //mongoDB id of logged in user
  const author_Id = await getUserId(author.id); //mongoDB id of author
  const likes = await countLikes(id);
  const saves = await countSaves(id);

  /////////////////////////////////////////////////////////////

  let likedThreadIds = await getAllLikedThreadIds(userId);
  // I pass the array of IDObjects to an array of strings:
  likedThreadIds = likedThreadIds.map((el) => el.toString());

  let savedThreadIds = await getAllSavedThreadIds(userId);
  savedThreadIds = savedThreadIds.map((el) => el.toString());

  return (
    <>
      {/*DELETE THREAD MODAL*/}
      <DeleteThread
        threadId={JSON.stringify(id)}
        currentUserId={currentUserId}
        authorId={author.id}
        parentId={parentId}
        isComment={isComment}
      />

      {/*THREAD CARDS*/}
      <article
        className={`flex w-full flex-col rounded-xl ${
          isComment ? "px-0 xs:px-7" : "bg-light-1 p-7 box-shadow-big"
        }`}
      >
        {/*PROFILE IMAGE */}

        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link href={`/profile/${author.id}`}>
                <div className="relative h-12 w-12">
                  {author.image && (
                    <img
                      src={author.image}
                      alt="user_community_image"
                      className="rounded-image-profile-cards"
                    />
                  )}
                </div>
              </Link>

              {/*THE VERTICAL LINE */}

              <div
                className={`thread-card_bar ${
                  isComment ? "bg-light-1" : "bg-dark-1"
                }`}
              />
            </div>

            {/*THE USERNAME */}

            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <Link href={`/profile/${author.id}`} className="w-fit">
                  <h4
                    className={`cursor-pointer break-all ${
                      isComment
                        ? "text-base-bold text-light-1"
                        : "text-base-semibold text-dark-1 "
                    } `}
                  >
                    {author.name}
                  </h4>
                </Link>
              </div>
              {/*THE TEXT OF THE THREAD */}{" "}
              <ThreadText
                text={content}
                isComment={isComment}
                authorId={author.id}
                currentUserId={currentUserId}
                author_Id={author_Id}
                threadId={id}
              />
              {/*THE FOUR ICONS  */}
              <div
                className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}
              >
                <div className="flex xxs:gap-5 gap-2">
                  <Likes
                    isComment={isComment}
                    threadId={id ? id.toString() : ""}
                    currentUserId={currentUserId.toString()}
                    userId={userId ? userId.toString() : ""}
                    likes={likes}
                    likedThreads={likedThreadIds.includes(id.toString())}
                  />

                  {/*REPLIES */}
                  <Link
                    href={`/thread/${id}`}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={
                        isComment
                          ? "/assets/reply-white.svg"
                          : "/assets/reply-black.svg"
                      }
                      alt="heart"
                      className="cursor-pointer object-contain w-[20px] h-[20px] xxs:w-[24px] xxs:h-[24px]"
                    />
                  </Link>

                  {/*SHARE THREAD ICON */}

                  <div className="flex items-center justify-center">
                    <img
                      src={
                        isComment
                          ? "/assets/share-white.svg"
                          : "/assets/share-black.svg"
                      }
                      alt="share icon"
                      className="cursor-pointer object-contain  w-[20px] h-[20px] xxs:w-[24px] xxs:h-[24px]"
                    />
                  </div>

                  {/*SAVE THREAD ICON */}

                  <SaveThread
                    isComment={isComment}
                    threadId={id ? id.toString() : ""}
                    currentUserId={currentUserId.toString()}
                    userId={userId ? userId.toString() : ""}
                    saves={saves}
                    savedThreads={savedThreadIds.includes(id.toString())}
                  />
                </div>
                {isComment && (
                  <p className="text-subtle-medium text-light-2 mt-1">
                    {formatDateString(createdAt)}
                  </p>
                )}

                {/*DEPENDING WHETHER IT IS ORIGINAL OR COMMENT****/}

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

          <ThreadCardOptions
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
              <img
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                className={`${
                  index !== 0 && "-ml-5"
                } rounded-image-profile-reply`}
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

        {!isComment && (
          <p className="text-subtle-medium text-light-3 mt-5">
            {formatDateString(createdAt)}
          </p>
        )}
      </article>
    </>
  );
}

export default ThreadCard;
