import { useEffect } from "react";
import Navigation from "./Navigation";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if(!accessToken){
      navigate("/login") 
    }
  }, [navigate])


  return (
    <div className=" flex flex-col justify-center items-center w-full">
      <Navigation />
      <Outlet />
    </div>
  );
}
