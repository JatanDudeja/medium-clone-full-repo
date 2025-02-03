import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface BlogComponentProps {
  id: number;
  authorName: string;
  blogTitle: string;
  blogContent: string;
  createdAt: Date | string;
  last: boolean;
  index: number;
}

export default function BlogComponent({
  id,
  authorName,
  blogTitle,
  blogContent,
  createdAt,
  last,
  index
}: BlogComponentProps) {
  const navigate = useNavigate();

  return (
    <div
      id={id?.toString()}
      className="w-[70%] flex items-center justify-center flex-col gap-1 text-[14px] mb-5 hover:cursor-pointer"
      onClick={() => {
        navigate(`/blog/${id}`);
      }}
      key={index}
    >
      <div className="w-full flex justify-start items-center flex-row gap-2">
        <div className="rounded-[50%] bg-red-500 h-7 w-7" />
        <div>{authorName}</div>
        <div className="text-gray-400 ">
          {dayjs(createdAt)?.format("dddd, DD MMM YYYY")?.toString()}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center ">
        <div className="flex justify-center items-center text-black font-bold text-2xl">
          {blogTitle}
        </div>
        <div className="flex justify-normal items-center text-gray-600">{blogContent?.length > 400 ? (blogContent.slice(0, 314) + "...") : blogContent}</div>
      </div>
      {!last ? (
        <div className="w-full h-[0.5px] bg-gray-300 mt-5 mb-5"></div>
      ) : null}
    </div>
  );
}
