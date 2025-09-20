import React from "react";

const SkeletonLoader = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row  rounded-lg overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="md:w-1/3 h-40 bg-gray-700"></div>
          {/* Content placeholder */}
          <div className="flex-1 p-4 flex flex-col justify-between gap-2">
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>{" "}
            {/* date & read time */}
            <div className="h-6 bg-gray-700 rounded w-3/4"></div> {/* title */}
            <div className="h-4 bg-gray-700 rounded w-full"></div>{" "}
            {/* subtitle line */}
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>{" "}
            {/* subtitle line */}
            <div className="h-4 bg-gray-700 rounded w-1/4 mt-2"></div>{" "}
            {/* comments */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
