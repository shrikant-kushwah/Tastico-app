
const Skeleton = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90vw] max-w-7xl mx-auto mt-25 px-4">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          role="status"
          className="animate-pulse rounded-lg shadow-md bg-gray-100 p-4"
        >
          <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
