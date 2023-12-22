"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions/thread.actions";

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = async () => {
    setIsButtonDisabled(true);
    await deleteThread(JSON.parse(threadId), pathname);
    if (!parentId || !isComment) {
      router.push(pathname);
    }

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  return (
    <button
      className="flex items-center"
      disabled={isButtonDisabled}
      onClick={handleClick}
    >
      <Image
        src="/assets/delete-red.svg"
        alt="delete"
        width={20}
        height={20}
        className="cursor-pointer object-contain me-1"
      />
      <div className="text-dark-1 max-xs:text-small-semibold">Delete Post</div>
    </button>
  );
}

export default DeleteThread;
