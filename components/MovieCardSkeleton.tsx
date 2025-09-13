"use client";
import Skeleton from "@mui/material/Skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="w-[250px] rounded-2xl">
      <Skeleton className="rounded-t-2xl" variant="rectangular" height={300} />
      <div className="">
        {" "}
        <Skeleton
          variant="text"
          sx={{ fontSize: "2rem", marginBlockStart: "0px" }}
        />
        <Skeleton
          className="rounded-b-2xl"
          variant="text"
          sx={{ fontSize: "1.5rem" }}
        />
      </div>
    </div>
  );
}
