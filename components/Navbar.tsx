"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav>
      <Search />
      <button
        className="bg-red-500 text-white px-1.5 rounded-sm text-sm"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        logout
      </button>
    </nav>
  );
}
