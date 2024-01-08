"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={
                isActive
                  ? "bottombar_link bg-light-1 text-dark-1 text-subtle-medium"
                  : "bottombar_link text-light-1 text-subtle-medium"
              }
            >
              <Image
                src={isActive ? link.imgURLActive : link.imgURLnotActive}
                alt={link.label}
                width={22}
                height={22}
                className="object-contain"
              />
              <div className="max-xs:hidden">{link.label.split(/\s+/)[0]}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

//
export default Bottombar;

// /\s+/ matches one or more whitespace characters, such as spaces, tabs, or line breaks. When the split() method encounters a whitespace character, it splits the string at that point and creates a new element in the resulting array.
