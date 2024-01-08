"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();

  return (
    <article className="user-card">
      <Link href={`/profile/${id}`}>
        <div className="user-card_avatar">
          <div className="relative h-12 w-12">
            {imgUrl && (
              <Image
                src={imgUrl}
                alt="user_logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            )}
          </div>

          <div className="flex-1 break-all">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-light-1">{username}</p>
          </div>
        </div>
      </Link>

      <Button
        className="user-card_btn bg-light-1 text-dark-1 box-shadow-small hover:bg-dark-1 hover:text-light-1"
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
