import React from "react";

const SearchSkeleton = () => {
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 space-y-6 px-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex gap-4 animate-pulse items-center bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="h-20 w-20 bg-gray-200 rounded-lg"></div>

          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
