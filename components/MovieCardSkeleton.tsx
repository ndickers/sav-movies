"use client";
import Skeleton from "@mui/material/Skeleton";

export default function MovieCardSkeleton() {
  return (
    <div
      data-testid="movie-card-skeleton-wrapper"
      className="w-[250px] rounded-2xl"
    >
      <Skeleton
        data-testid="movie-card-skeleton-item"
        className="rounded-t-2xl"
        variant="rectangular"
        height={300}
      />
      <div className="">
        {" "}
        <Skeleton
          data-testid="movie-card-skeleton-item"
          variant="text"
          sx={{ fontSize: "2rem", marginBlockStart: "0px" }}
        />
        <Skeleton
          data-testid="movie-card-skeleton-item"
          className="rounded-b-2xl"
          variant="text"
          sx={{ fontSize: "1.5rem" }}
        />
      </div>
    </div>
  );
}
