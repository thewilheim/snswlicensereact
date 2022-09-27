import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { server } from "../web-services";

function Homepage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getUser = async () => {
    const response = fetch(`${server}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1>Homepage</h1>
      <header>
        <nav>
          <div onClick={() => navigate("/logbook")}>Home</div>
          {token ? (
            <div>
              Logged in as John Doe -{" "}
              <button onClick={() => logOut()}>Log Out</button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Homepage;
