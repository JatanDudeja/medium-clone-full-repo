import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/env";
import axios from "axios";
import dayjs from "dayjs";

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
        <div className="flex justify-center items-center h-screen mt-32">
          <div className="flex justify-center items-center w-[70%] gap-9 h-screen p-5">
            <div className="w-full flex flex-col items-start h-screen mt-12 box-border">
              <div className="items-center justify-center flex font-bold text-5xl">
                {singleBlogData?.title}
              </div>
              <div className="items-center justify-center flex p-3 pl-0 pb-4 pt-2 text-gray-500 text-sm">
                Posted On{" "}
                {dayjs(singleBlogData?.createdAt?.toString())?.format(
                  "dddd, DD MMM YYYY"
                )}
              </div>
              <div className="items-center justify-center flex">
                {singleBlogData?.description}
              </div>
            </div>

            <div className="flex w-[30%] h-screen mt-12">
              <div className="flex flex-col p-2 gap-y-3">
                <div>Author</div>
                <div className="flex items-center justify-center gap-4">
                  <div className="rounded-[50%] bg-red-500 h-6 w-6"></div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">{singleBlogData?.userID}</div>
                    <div className="text-gray-400">{""} Author Description</div>
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
