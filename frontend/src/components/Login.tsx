import { useState } from "react";
import { BASE_URL } from "../utils/env";
import { CustomInput } from "./CustomInput";
import axios, { AxiosError } from "axios";
import { UserSigninDTO } from "@jatan_dudeja/medium-clone";

interface LoginResDTO {
  data: {
    statusCode: number;
    message: string;
    data: {
      username: string;
      userID: number;
      accessToken: string;
      refreshToken: string;
    };
  }
}

export default function Login() {
  const [loginDetails, setLoginDetails] = useState<UserSigninDTO>({
    username: "",
    password: "",
  });

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const loginRes: LoginResDTO = await axios.post(`${BASE_URL}user/login`, {
        username: loginDetails?.username,
        password: loginDetails?.password,
      });

      localStorage.setItem("accessToken", loginRes?.data?.data?.accessToken);
      localStorage.setItem("refreshToken", loginRes?.data?.data?.refreshToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(">>>signupRes: ", error.response?.data?.message);
      } else {
        console.error("Unexpected error: ", error);
      }
      // TODO: add Toast here
    }
  };

  return (
    <div className="flex w-[70%] justify-center flex-col p-5 gap-5">
      <CustomInput
        label="Username"
        placeHolder="Enter your username"
        onChange={(e) =>
          setLoginDetails((lastValue) => {
            return {
              ...lastValue,
              username: e.target.value,
            };
          })
        }
      />
      <CustomInput
        label="Password"
        placeHolder="Enter your password"
        onChange={(e) =>
          setLoginDetails((lastValue) => {
            return {
              ...lastValue,
              password: e.target.value,
            };
          })
        }
        type="password"
      />
      <button
        className="bg-black h-12 text-white rounded-lg text-md hover:bg-gray-800"
        onClick={handleSignin}
      >
        SignIn
      </button>
    </div>
  );
}
