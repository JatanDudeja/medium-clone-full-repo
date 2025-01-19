import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { BASE_URL } from "../utils/env";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
  });

  const [responsePending, setResponsePending] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.values(blogData).every((item) => item)) {
      setResponsePending(false);
    } else {
      setResponsePending(true);
    }
  }, [blogData]);

  const handleBlogDataChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(e.target.name, ": ", e.target.value);
    setBlogData((lastValue) => ({
      ...lastValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePublishBlogPost = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    }
    try {
      const createPostRes = await axios.post(
        `${BASE_URL}blog`,
        {
          ...blogData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!createPostRes) {
        alert("Error while creating post please try again");
      }
      navigate(`/blog/${createPostRes?.data?.data?.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(">>>signupRes: ", error.response?.data?.message);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  return (
    <div className="flex w-full h-screen justify-center">
      <div className="flex w-[70%] items-center flex-col h-full">
        <div className="flex w-[70%] gap-3">
          <div className="w-[1px] h-20 bg-gray-300"></div>
          <input
            className={`p-3 focus:outline-none focus:border-none hover:border-gray-400 w-full h-20 text-3xl`}
            placeholder={"Title"}
            onChange={handleBlogDataChange}
            name="title"
            required
          />
        </div>
        <div className="flex w-[70%] flex-col justify-start h-full">
          <textarea
            className="p-6 focus:outline-none focus:border-none hover:border-gray-400 w-full h-full text-lg resize-none overflow-hidden"
            name="description"
            placeholder="Type your story..."
            onChange={handleBlogDataChange}
            required
          />

          <div className="flex justify-center items-center p-2">
            <button
              className={`bg-black h-12 text-white rounded-lg text-md hover:bg-gray-800 mt-5 w-[50%] ${
                responsePending && "bg-gray-400 hover:bg-gray-400"
              }`}
              disabled={responsePending}
              onClick={handlePublishBlogPost}
            >
              Publish Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
