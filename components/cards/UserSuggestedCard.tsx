"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
}

function UserSuggestedCard({ id, name, username, imgUrl }: Props) {
  const router = useRouter();

  return (
    <article
      className="user-card cursor-pointer mb-5"
      onClick={() => {
        router.push(`/profile/${id}`);
      }}
    >
      <div className="user-card_avatar">
        {/*IMAGE*/}

        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/*INFO*/}
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>
    </article>
  );
}

export default UserSuggestedCard;
