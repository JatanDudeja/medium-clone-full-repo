interface BlogComponentProps {
  id: number;
  authorName: string;
  blogTitle: string;
  blogContent: string;
  createdAt: Date | string;
}

export default function BlogComponent({
  id,
  authorName,
  blogTitle,
  blogContent,
  createdAt,
}: BlogComponentProps) {
  return (
    <div
      id={id?.toString()}
      className="w-[70%] flex items-center justify-center flex-col gap-1 text-[14px]"
    >
      <div className="w-full flex justify-start items-center flex-row gap-2">
        <div className="rounded-[50%] bg-red-500 h-7 w-7" />
        <div>{authorName}</div>
        <div className="text-gray-400 ">{createdAt?.toString()}</div>
      </div>
      <div className="w-full flex flex-col items-start justify-center ">
        <div className="flex justify-center items-center text-black font-bold text-2xl">
          {blogTitle}
        </div>
        <div className="flex justify-normal items-center">{blogContent}</div>
      </div>
      <div></div>
    </div>
  );
}
