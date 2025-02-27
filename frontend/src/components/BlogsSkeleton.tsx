export default function BlogsSkeleton() {
  return (
    <div
      role="status"
      className="w-full animate-pulse flex items-center justify-center"
    >
      <div className="w-full px-4 md:p-0 md:w-[70%] flex items-center justify-center flex-col gap-1 text-[14px] mb-5">
        {/* Author Section */}
        <div className="w-full flex justify-start items-center flex-row gap-2">
          <div className="rounded-full bg-gray-300 h-7 w-7"></div>
          <div className="h-2 bg-gray-300 rounded-full w-32"></div>
          <div className="h-2 bg-gray-300 rounded-full w-40"></div>
        </div>

        {/* Blog Title */}
        <div className="w-full flex flex-col items-start justify-center mt-2">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-2 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* Blog Content Preview */}
        <div className="w-full flex flex-col items-start justify-center mt-2">
          <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-2 bg-gray-300 rounded w-5/6 mb-1"></div>
          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* Divider (if not last) */}
        <div className="w-full h-[0.5px] bg-gray-300 mt-5 mb-5"></div>
      </div>
    </div>
  );
}
