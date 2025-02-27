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
        <div className="flex justify-center items-center h-screen w-full mb-24">
          <div className="flex-col flex md:justify-center md:items-center w-full md:w-[70%] gap-5 md:gap-9 h-screen p-5 md:flex-row lg:items-start pb-5 md:pb-0">
            <div className="w-full flex flex-col items-start mt-2 md:mt-12">
              <div className="items-center justify-center flex font-bold text-5xl">
                {singleBlogData?.title}
              </div>
              <div className="items-center justify-center flex p-3 pl-0 pb-4 pt-2 text-gray-500 text-sm">
                Posted On{" "}
                {dayjs(singleBlogData?.createdAt?.toString())?.format(
                  "dddd, DD MMM YYYY"
                )}
              </div>
              <div className="flex items-start justify-center h-[500px] overflow-y-auto">
                {singleBlogData?.description}
              </div>
            </div>

            <div className="flex md:w-[30%] lg:mt-16 w-full border-2 rounded-lg bg-blue-300 shadow-none h-[180px] md:justify-between">
              <div className="flex flex-col p-2 md:gap-y-3 w-full">
                <div className="text-xl md:text-sm font-bold">Author</div>
                <div className="flex md:items-center md:justify-center gap-4">
                  <div className="rounded-[50%] bg-red-500 h-6 w-6"></div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">
                      {singleBlogData?.userID}
                    </div>
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
