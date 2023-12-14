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

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Image
      src={isComment ? "/assets/delete-black.svg" : "/assets/delete-red.svg"}
      alt="delete"
      width={18}
      height={18}
      className="cursor-pointer object-contain pt-1"
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
          router.push(pathname);
        }
      }}
    />
  );
}

export default DeleteThread;
