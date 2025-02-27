import { useEffect, useState } from "react";
import BlogComponent from "../components/BlogComponent";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/env";
import { useNavigate } from "react-router-dom";
import BlogsSkeleton from "../components/BlogsSkeleton";

interface AllBlogsValueDTO {
  id: number;
  userID: number;
  authorUsername: string;
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

    setTokenDetails((prev) => {
      if (
        prev.accessToken === accessToken &&
        prev.refreshToken === refreshToken
      ) {
        return prev;
      }
      return { accessToken, refreshToken };
    });
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
        if (error instanceof AxiosError) {
          if (error?.status === 401) {
            console.log(">>yoyo");
            navigate("/login");
          }
          return;
        }

        return null;
      }
    };

    if (tokenDetails?.accessToken) {
      getAllBlogs();
    }
  }, [navigate, tokenDetails?.accessToken]);

  if (allBlogs.length === 0) {
    return <BlogsSkeleton />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {allBlogs?.map((singleBlog, index) => {
        return (
          <BlogComponent
            id={singleBlog?.id}
            authorName={singleBlog?.authorUsername}
            blogTitle={singleBlog?.title}
            blogContent={singleBlog?.description}
            createdAt={singleBlog?.createdAt}
            last={index === allBlogs?.length - 1}
            index={index}
          />
        );
      })}
    </div>
  );
}
