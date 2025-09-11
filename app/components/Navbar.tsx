"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <button
        className="bg-red-500 text-white px-1.5 rounded-sm text-sm"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        logout
      </button>
    </nav>
  );
}
