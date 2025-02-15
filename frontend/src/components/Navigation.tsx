import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  const handleBlogPaths = (path: string) => {
    navigate(`/blogs/${path}`);
  };

  return (
    <>
      <div className="flex px-5 py-3 justify-between md:gap-10 md:justify-start items-center md:w-[70%] md:p-3 w-full z-1">
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => handleBlogPaths("create")}
        >
          +
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          For You
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          Following
        </div>
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => handleBlogPaths("")}
        >
          Blogs
        </div>
      </div>
      <div className="h-[1px] md:w-[70%] bg-gray-200 mt-2 mb-6 w-full"></div>
    </>
  );
}
