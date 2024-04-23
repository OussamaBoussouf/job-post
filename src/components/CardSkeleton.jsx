import React from "react";

function CardSkeleton() {
  return (
    <div className="animate-pulse flex p-5 border-[1px] items-center rounded-md gap-3 mb-5">
      <div className="w-[100px] h-[100px] bg-gray-300 rounded-full"></div>
      <div>
        <div className="h-[20px] w-[200px] rounded-xl bg-gray-300 mb-5"></div>
        <div className="h-[10px] w-[150px] rounded-xl bg-gray-300 mb-3"></div>
        <div className="h-[10px] w-[150px] rounded-xl bg-gray-300"></div>
      </div>
    </div>
  );
}

export default CardSkeleton;
