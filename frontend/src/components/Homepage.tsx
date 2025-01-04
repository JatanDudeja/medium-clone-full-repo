import { Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";

interface HomepageProps {
  isSiginProp: boolean;
}

export default function Homepage({ isSiginProp }: HomepageProps) {
  const [isSignin, setIsSignin] = useState<boolean>(isSiginProp);

  return (
    <div className="flex w-full items-center justify-center h-screen flex-col">
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex justify-center font-bold text-4xl">
          {isSignin ? "Login" : "Create An Account"}
        </div>
        <div className="flex items-center justify-center text-md gap-1 flex-row text-gray-500 mt-2">
          <p>
            {isSignin ? "Do not have an account?" : "Already have an account?"}
          </p>
          <Link
            to={isSignin ? "/signup" : "/login"}
            className=" hover:cursor-pointer underline hover:text-gray-900"
            onClick={() => setIsSignin((lastValue) => !lastValue)}
          >
            {isSignin ? "Signup" : "Login"}
          </Link>
        </div>
      </div>
      {isSignin ? <Login /> : <Signup />}
    </div>
  );
}
