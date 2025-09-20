import React from "react";

const SkeletonLoader = ({ count = 3, height = "h-40" }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 ${height} rounded-lg animate-pulse`}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
