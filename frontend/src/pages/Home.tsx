import Quote from "../components/Quote";
import Homepage from "../components/Homepage";

interface HomeProps {
  isSigin: boolean;
}

export function Home({ isSigin }: HomeProps) {
  return (
    <div className="flex flex-row w-full">
      <Homepage isSiginProp={isSigin} />
      <div className="bg-gray-200 w-full h-screen">
        <Quote />
      </div>
    </div>
  );
}
