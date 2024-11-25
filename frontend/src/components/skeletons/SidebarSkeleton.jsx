// src/components/skeletons/SidebarSkeleton.jsx
const SidebarSkeleton = () => {
  return (
    <div className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-base-300 w-full p-4 flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-24 h-4 bg-gray-300 rounded hidden lg:block"></div>
      </div>
      {/* Filter Skeleton */}
      <div className="hidden lg:flex items-center gap-2 p-4 border-b border-base-300">
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        <div className="w-16 h-3 bg-gray-300 rounded"></div>
      </div>
      {/* User List Skeleton */}
      <div className="flex-1 p-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="w-3/4 h-4 bg-gray-300 rounded mb-1"></div>
              <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
