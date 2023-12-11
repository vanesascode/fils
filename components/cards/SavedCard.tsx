import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteSaved from "../forms/DeleteThread";

import Likes from "../Likes";
import SaveThread from "../forms/SaveThread";

import { getUserId } from "@/lib/actions/user.actions";

interface Props {
  id: string;
  currentUserId: string;
  content: string;
  parentId: string | null | undefined;

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
  const userId = await getUserId(currentUserId);

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-light-1 p-7 box-shadow-big"
      }`}
    >
      {/*PROFILE IMAGE */}

      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/thread/${id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full object-cover "
              />
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
            <Link href={`/thread/${id}`} className="w-fit">
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
          </div>
        </div>

        <DeleteSaved
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {/*THE NUMBER OF REPLIES IF IT IS AN ORIGINAL THREAD*/}

      <div className="ml-1 mt-5 flex items-center gap-2">
        <p className="text-subtle-medium text-light-2 ">
          {formatDateString(createdAt)}
        </p>
      </div>
    </article>
  );
}

export default ThreadCard;
