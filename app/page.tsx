"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="py-24">
        <h1 className="font-black text-xl md:text-2xl ">
          Movies Recommendation
        </h1>

        <p className="text-center text-base mt-6">Sign in</p>
        <button
          onClick={() => {
            signIn("google", { callbackUrl: "/dashboard" });
          }}
          className="flex items-center justify-center text-sm md:text-base gap-1.5 border border-[#D9D9D9))]  mt-6 lg:mt-4 w-full rounded-md py-1.5 lg:py-1"
        >
          <Image
            src={"/icons-google.svg"}
            width={25}
            height={25}
            alt="continue with google"
          />
          Continue with google
        </button>
      </div>
    </div>
  );
}
