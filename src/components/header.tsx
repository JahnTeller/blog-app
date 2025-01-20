import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <nav className="flex items-center gap-3  font-bold">
        <Link href={"/"} className=" text-red-600 text-2xl">
          Buletin
        </Link>
        <div className="border-[1.5px] border-gray-300 h-6"></div>
        <Link href={"/blog"} className="text-sm">
          New Blog
        </Link>
      </nav>{" "}
      <div className="flex items-center justify-center gap-3">
        <ThemeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
