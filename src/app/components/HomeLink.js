"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// A link home. Already on the home page, it glides back up to the landing
// instead of jumping there; from anywhere else it navigates as usual.
export default function HomeLink(props) {
  const pathname = usePathname();

  const onClick = (e) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return <Link href="/" onClick={onClick} {...props} />;
}
