import { useEffect, useState } from "react";
import BlogComponent from "../components/BlogComponent";
import axios from "axios";
import { BASE_URL } from "../utils/env";
import { useNavigate } from "react-router-dom";

interface AllBlogsValueDTO {
  id: number;
  userID: number;
  author: string;
  title: string;
  description: string;
  createdAt: Date | string;
}

export default function Blog() {
  const [tokenDetails, setTokenDetails] = useState({
    accessToken: "",
    refreshToken: "",
  });

  const [allBlogs, setAllBlogs] = useState<AllBlogsValueDTO[] | []>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || "";
    const refreshToken = localStorage.getItem("refreshToken") || "";

    if(!accessToken) {
      navigate("/login");
    }

    setTokenDetails((item) => ({
      ...item,
      accessToken,
      refreshToken,
    }));
  }, []);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        if (!tokenDetails?.accessToken) {
          navigate("/login");
        }

        const allBlogsRes = await axios.get(`${BASE_URL}blog/bulk`, {
          headers: {
            Authorization: `Bearer ${tokenDetails?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // TODO: add error handling if get all blogs api fails
        setAllBlogs(allBlogsRes?.data?.data);
      } catch (error) {
        console.log(">>>error: ", error);
        return null;
      }
    };

    if (tokenDetails?.accessToken) {
      getAllBlogs();
    }
  }, [navigate, tokenDetails]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex gap-10 justify-start items-center w-[70%] p-3">
        <div className="flex justify-center items-center">+</div>
        <div className="flex justify-center items-center">For You</div>
        <div className="flex justify-center items-center">Following</div>
      </div>
      <div className="h-[1px] w-[70%] bg-gray-200 mt-2 mb-6"></div>

      {allBlogs?.map((singleBlog) => {
        return (
          <BlogComponent
            id={singleBlog?.id}
            authorName={singleBlog?.author}
            blogTitle={singleBlog?.title}
            blogContent={singleBlog?.description}
            createdAt={singleBlog?.createdAt}
          />
        );
      })}
    </div>
  );
}
