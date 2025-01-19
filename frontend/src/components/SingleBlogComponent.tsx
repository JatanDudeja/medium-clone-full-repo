import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/env";
import axios from "axios";

interface SingleBlogComponentProps {
  userID: number;
  title: string;
  description: string;
  createdAt: Date | string;
  authorDescription?: string;
}

export default function SingleBlogComponent() {
  const [singleBlogData, setSingleBlogData] =
    useState<SingleBlogComponentProps | null>(null);

  const { id: blogID } = useParams() || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!blogID) {
      navigate("/blogs", { replace: true });
    }

    const accessToken = localStorage.getItem("accessToken") || "";

    if (!accessToken) {
      navigate("/login", { replace: true });
    }

    const getSingleBlogData = async () => {
      try {
        const singleBlogRes = await axios.get(`${BASE_URL}blog/${blogID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSingleBlogData(singleBlogRes?.data?.data);
        if (!singleBlogRes) {
          navigate("/blogs", { replace: true });
        }
      } catch (error) {
        console.log(">>>error: ", JSON.stringify(error));
        navigate("/blogs", { replace: true });
      }
    };

    getSingleBlogData();
  }, []);

  return (
    <>
      {singleBlogData ? (
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-[70%]">
            <div className="w-full flex flex-col justify-center items-start">
              <div className="items-center justify-center flex">
                {singleBlogData?.title}
              </div>
              <div className="items-center justify-center flex">
                {singleBlogData?.createdAt?.toString()}
              </div>
              <div className="items-center justify-center flex">
                {singleBlogData?.description}
              </div>
            </div>

            <div className="flex w-[30%]">
              <div className="flex flex-col p-2">
                <div>Author</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="rounded-[50%] bg-red-500 h-6 w-6"></div>
                  <div className="flex flex-col">
                    <div>{singleBlogData?.userID}</div>
                    <div>{""} Author Description</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
