// import { useState } from "react";
import Quote from "../components/Quote";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";

export function Home() {
  const [isSignin, setIsSignin] = useState<boolean>(true);

  //   pass this as prop to Login and Signup Components to change the state isSignin
  const handleSigninSignup = () => {
    setIsSignin((lastState) => !lastState);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="w-full h-screen">{isSignin ? <Login /> : <Signup />}</div>
      <div className="bg-gray-200 w-full h-screen">
        <Quote />
      </div>
    </div>
  );
}
