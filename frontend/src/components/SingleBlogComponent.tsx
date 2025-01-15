interface SingleBlogComponentProps {
  authorName: string;
  blogTitle: string;
  blogContent: string;
  createdAt: Date | string;
  authorDescription?: string;
}

export default function SingleBlogComponent({
  blogTitle,
  blogContent,
  createdAt,
  authorName,
  authorDescription,
}: SingleBlogComponentProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center w-[70%]">
        <div className="w-full flex flex-col justify-center items-start">
          <div className="items-center justify-center flex">{blogTitle}</div>
          <div className="items-center justify-center flex">
            {createdAt?.toString()}
          </div>
          <div className="items-center justify-center flex">{blogContent}</div>
        </div>

        <div className="flex w-[30%]">
          <div className="flex flex-col p-2">
            <div>Author</div>
            <div className="flex items-center justify-center gap-2">
              <div className="rounded-[50%] bg-red-500 h-6 w-6"></div>
              <div className="flex flex-col">
                <div>{authorName}</div>
                <div>{authorDescription}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
