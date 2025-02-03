import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate("/blog/create");
  };

  return (
    <>
      <div className="flex gap-10 justify-start items-center w-[70%] p-3">
        <div
          className="flex justify-center items-center"
          onClick={handleCreateBlog}
        >
          +
        </div>
        <div className="flex justify-center items-center">For You</div>
        <div className="flex justify-center items-center">Following</div>
      </div>
      <div className="h-[1px] w-[70%] bg-gray-200 mt-2 mb-6"></div>
    </>
  );
}
