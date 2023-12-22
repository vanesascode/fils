"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import { removeLikedThread } from "@/lib/actions/user.actions";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  isComment?: boolean;
  parentId: string | null | undefined;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  // if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <button
      className="flex items-center"
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
          router.push(pathname);
        }
      }}
    >
      <Image
        src="/assets/edit.svg"
        alt="delete"
        width={20}
        height={20}
        className="cursor-pointer object-contain me-1"
      />
      <div className="text-dark-1 max-xs:text-small-semibold">Edit Post</div>
    </button>
  );
}

export default DeleteThread;
