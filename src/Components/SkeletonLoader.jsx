import React from "react";

const SkeletonLoader = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col rounded-lg overflow-hidden animate-pulse bg-gray-400"
        >
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gray-400"></div>

          {/* Content placeholder */}
          <div className="p-4 flex flex-col gap-2">
            <div className="h-4 bg-gray-400 rounded w-1/3"></div>{" "}
            {/* date & read time */}
            <div className="h-6 bg-gray-400 rounded w-3/4"></div> {/* title */}
            <div className="h-4 bg-gray-400 rounded w-full"></div>{" "}
            {/* subtitle line */}
            <div className="h-4 bg-gray-400 rounded w-5/6"></div>{" "}
            {/* subtitle line */}
            <div className="h-4 bg-gray-400 rounded w-1/4 mt-2"></div>{" "}
            {/* comments */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
