import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, server } from "../web-services";

function Homepage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUser = async () => {
    const response = fetch(`${server}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  function logOut() {
    logout()
    navigate("/");
  }

  return (
    <>
      <h1>Homepage</h1>
      
      <Outlet />
    </>
  );
}

export default Homepage;
