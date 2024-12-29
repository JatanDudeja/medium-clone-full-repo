// import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex justify-center font-bold text-3xl">
          {" "}
          Create An Account
        </div>
        <div className="flex items-center justify-center text-md gap-1 flex-row">
          <p>Already have an account</p>
          <Link to="/signup" className=" hover:cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
