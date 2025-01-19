import { useEffect, useState } from "react";
import { CustomInput } from "./CustomInput";
import { UserSingupDTO } from "@jatan_dudeja/medium-clone";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/env";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [responsePending, setResponsePending] = useState<boolean>(false);
  const [signinDetails, setSignupDetails] = useState<UserSingupDTO>({
    username: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      navigate("/blogs", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (Object.values(signinDetails).some((item) => !item)) {
      setResponsePending(true);
    } else {
      setResponsePending(false);
    }
  }, [signinDetails]);

  const navigate = useNavigate();

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResponsePending(true);
    try {
      await axios.post(`${BASE_URL}user/signup`, {
        ...signinDetails,
      });

      setResponsePending(false);
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(">>>signupRes: ", error.response?.data?.message);
      } else {
        console.error("Unexpected error: ", error);
      }
      // TODO: add TOAST here
    }
    setResponsePending(false);
    setSignupDetails({
      username: "",
      password: "",
      name: "",
    });
  };

  return (
    <div className="flex w-[70%] justify-center flex-col p-5 gap-5">
      <CustomInput
        label="Name"
        placeHolder="Enter your username"
        onChange={(e) =>
          setSignupDetails((lastValue) => {
            return {
              ...lastValue,
              name: e.target.value,
            };
          })
        }
      />
      <CustomInput
        label="Username"
        placeHolder="Enter your username"
        onChange={(e) =>
          setSignupDetails((lastValue) => {
            return {
              ...lastValue,
              username: e.target.value,
            };
          })
        }
      />
      <CustomInput
        label="Password"
        placeHolder="Enter your passoword"
        onChange={(e) =>
          setSignupDetails((lastValue) => {
            return {
              ...lastValue,
              password: e.target.value,
            };
          })
        }
        type="password"
      />
      <button
        disabled={responsePending}
        className={`text-white rounded-lg text-md h-12 ${
          responsePending ? "bg-gray-200" : "bg-black  hover:bg-gray-800"
        }`}
        onClick={handleSignup}
      >
        SignUp
      </button>
    </div>
  );
}
