"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  const router = useRouter();
  return (
    <>
      <article
        className="user-card cursor-pointer mb-5"
        onClick={() => {
          router.push(`/communities/${id}`);
        }}
      >
        <div className="user-card_avatar">
          {/*IMAGE*/}

          <div className="relative h-12 w-12">
            <Image
              src={imgUrl}
              alt="community_logo"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1 text-ellipsis">
            {/*INFO*/}

            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-subtle-regular text-light-1">@{username}</p>
          </div>
        </div>
      </article>
    </>
  );
}

export default CommunityCard;
