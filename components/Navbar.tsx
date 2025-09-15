"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Search from "./Search";

export default function Navbar() {
  const data = useSession();
  const name = data.data?.user?.name;
  return (
    <nav className="md:flex justify-between items-center mb-1.5 md:flex-row-reverse">
      <div className="flex justify-end items-center gap-2 mb-4">
        <p className="text-xs font-semibold">{name}</p>
        <button
          className="bg-red-500 text-white px-1.5 rounded-sm text-sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          logout
        </button>
      </div>
      <Search />
    </nav>
  );
}
