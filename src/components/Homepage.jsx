import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLicense, parseJwt } from "../web-services";
import ServiceCard from "./ServiceCard";

function Homepage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Overview | Service NSW Demo";
    const homepage = document.querySelector(".HomepageLink");

    if (homepage) {
      homepage.classList.add("font-bold");
    }

    return function cleanup() {
      if (homepage) {
        homepage.classList.remove("font-bold");
      }
    };
  }, []);

  if (!token) {
    return (
      <div className="flex justify-center flex-col items-center mt-80">
        <div className="flex mb-10">
          <svg
            width="66"
            height="69"
            viewBox="0 0 46 49"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-4"
          >
            <title>NSW Government</title>
            <path
              fill="#002664"
              d="M41.6 29.3l-2 8.6-2.2-8.6h-2.8l-2.2 8.5-1.9-8.5h-3.2l3.5 13.5h3.1l2.1-8.5 2.1 8.5h3v-.1l3.6-13.4zM12.5 37.9l-7.3-8.6H2.1v13.5h3v-8.6l7.3 8.6h3.2V29.3h-3.1zM1.8 46.9c0-1.2.9-2.2 2.2-2.2.7 0 1.2.2 1.6.6l-.5.6c-.3-.3-.6-.4-1.2-.4-.8 0-1.4.7-1.4 1.5 0 .9.6 1.5 1.4 1.5.4 0 .7-.1 1-.3v-.8h-1v-.6h1.8v1.8c-.5.2-1.1.4-1.7.4-1.3 0-2.2-.9-2.2-2.1M8.3 44.7c-1.3 0-2.2 1-2.2 2.2 0 1.2.9 2.1 2.2 2.1 1.3 0 2.2-1 2.2-2.2 0-1.1-.9-2.1-2.2-2.1zm1.4 2.2c0 .8-.6 1.5-1.4 1.5-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5c.8 0 1.4.7 1.4 1.5zM10.4 44.8h.8l1.3 3.2 1.3-3.2h.7L12.8 49h-.6zM15 44.8h3.1v.7h-2.3v1h2.1v.7h-2.1v1.1h2.4v.7H15zM21.3 47.4c.6-.2 1-.6 1-1.3 0-.4-.1-.7-.3-.9-.3-.3-.7-.4-1.2-.4h-1.9V49h.7v-1.5h.9l1 1.4h.9l-1.1-1.5zm-1.7-.5v-1.4h1.1c.5 0 .9.2.9.7 0 .4-.3.7-.9.7h-1.1zM22.9 44.8h.7l2.2 2.9v-2.9h.7V49h-.6l-2.3-3v3h-.7zM27.3 44.8h.8l1.2 2 1.3-2h.8V49h-.8v-3l-1.3 1.9L28 46v3h-.7zM32.1 44.8h3.1v.7h-2.4v1h2.1v.7h-2.1v1.1h2.4v.7h-3.1zM35.9 44.8h.7l2.2 2.9v-2.9h.7V49h-.6l-2.3-3v3h-.7zM41.4 45.5h-1.3v-.7h3.4v.7h-1.3V49h-.8zM16.4 40.9l1.8-2.1c1.2 1 2.5 1.7 4.1 1.7 1.2 0 2-.5 2-1.3s-.5-1.2-2.8-1.7c-2.8-.7-4.5-1.5-4.5-4.2 0-2.5 2-4.1 4.8-4.1 2 0 3.7.6 5.1 1.7L25.2 33c-1.2-.8-2.4-1.3-3.5-1.3-1.2 0-1.8.5-1.8 1.2 0 .9.6 1.2 2.9 1.8 2.8.7 4.3 1.7 4.3 4.1 0 2.7-2.1 4.2-5 4.2-2 .1-4.1-.6-5.7-2.1"
            ></path>
            <g fill="#d7153a">
              <path d="M9.3 3.8c-.3 0-.4.1-.5.5 0 0-.1.5-.1 1.3-.1 1.1-.2 2.3-.2 3.4 0 3.2.4 7.8 2.4 11.4 1.5 2.7 3.7 4.2 6.2 4.3-1.3-1-2.2-2.3-2.7-3.8-.6-1.8-.9-3.9-.9-6.3 0-3.3.6-6.1.7-6.9.1-.5.4-.8.7-1-2.5-1.6-4.6-2.5-5-2.7-.2-.1-.3-.2-.3-.2h-.3M30.5 7.6c-.1 0-.1 0-.2.1l-.2.2c-.1.1-.3.3-.6.5-.4.3-1.1 1-2 2-1.4 1.6-3.3 4-4.1 6.9-.5 1.7-.8 3.1-.7 4.3 0 .9.1 1.6.4 2.2.3.6.7 1 1.3 1.3.2.1.6.2.9.2 1.7 0 4.5-1.4 5.5-4.6.5-1.7.8-3.7.8-6 0-2.8-.4-5.2-.6-6.2l-.1-.5c-.1-.2-.2-.4-.4-.4"></path>
              <path d="M15.5 7.6c-.1 0-.2.2-.3.4l-.1.5c0 .2-.1.7-.2 1.4-.2 1.1-.3 2.8-.3 4.7 0 2.3.3 4.3.8 6 1 3.2 3.9 4.6 5.7 4.6.4 0 .7-.1 1-.2.1-.1.3-.1.4-.2l-.3-.6c-.3-.7-.5-1.6-.5-2.6 0-1.3.3-2.8.8-4.6 0-.2.1-.3.2-.5 0-.1 0-.1.1-.2-1.9-4.6-6.1-8.1-6.6-8.5l-.2-.2c-.3 0-.4-.1-.5 0M23 0c-.1 0-.2.1-.3.2 0 0-.1.1-.2.4-.3.4-.5.7-.7 1.1-.5.8-1.2 2.1-1.9 3.8-.5 1.1-.9 2.3-1.3 3.5 1.4 1.4 3.2 3.5 4.5 6.1 1-2 2.4-4.1 4.3-6.1-1.3-3.9-3.1-7.2-3.9-8.4l-.2-.4c-.1-.2-.2-.2-.3-.2M36.7 3.8c-.1 0-.1 0-.3.1 0 0-.1 0-.4.2-.2.1-.6.2-.9.4H35c-1.2.6-2.4 1.3-3.6 2-.1.1-.3.2-.4.2.4.2.6.5.7 1 .2.8.7 3.6.7 6.9 0 2.4-.3 4.5-.8 6.3-.5 1.5-1.4 2.8-2.6 3.8 2.4-.1 4.6-1.6 6.1-4.3 2-3.5 2.4-8.1 2.4-11.4 0-1.1 0-2.3-.2-3.4 0-.4-.1-.9-.1-1.3-.1-.4-.2-.5-.5-.5M30 1s-.1 0 0 0h-.1c-.1 0-.2 0-.2.1 0 0-.5.3-1.4.9-.5.3-1.2.9-2.1 1.6.6 1.3 1.2 2.7 1.7 4 1-.8 2.2-1.6 3.5-2.4-.4-1.9-.8-3.3-1-3.8 0-.2-.2-.4-.4-.4M16 1c-.2 0-.4.1-.5.4-.2.5-.6 1.9-1 3.8C15.8 6 17 6.8 18 7.6c.5-1.3 1-2.7 1.7-4-.7-.6-1.4-1.1-2-1.6-.8-.6-1.3-.9-1.4-.9-.1 0-.1-.1-.3-.1M4.2 9.8H3.1c-.3 0-.5.2-.7.4-.1.2-.1.3-.1.5 0 .5.4 2.2 2.5 4.9 1.1-.5 2.1-1 3.2-1.4-.2-1.3-.3-2.8-.4-4.3-1-.1-2-.1-2.9-.2l-.5.1M41.8 9.8h-.4c-.6 0-1.6 0-2.9.2 0 1.5-.2 2.9-.4 4.3 1 .4 2.1.9 3.2 1.4 2.1-2.7 2.4-4.4 2.5-4.9 0-.2-.1-.4-.1-.5-.2-.2-.4-.4-.7-.4-.1-.1-.5-.1-1.2-.1"></path>
              <path d="M37.9 15.2c-.4 2.2-1.1 4.1-2 5.6-.9 1.6-2.1 2.9-3.5 3.7 10-.5 12.8-3.8 13.1-4.1.1-.1.2-.3.2-.5 0-.3-.1-.6-.4-.7L45 19c-.2-.1-.4-.3-.7-.5l-.2-.2c-1.1-.7-2.2-1.3-3.3-1.9-.9-.4-1.9-.8-2.9-1.2M8.1 15.2C4.7 16.5 2 18.3 1 19c-.2.1-.3.2-.3.2-.2.2-.3.4-.3.7 0 .2 0 .3.1.5l.1.1c.1.1.2.2.5.4.4.4 1.2.9 2.4 1.5 2.5 1.1 6 1.9 10.1 2.1-1.4-.8-2.6-2.1-3.5-3.7-.9-1.5-1.6-3.4-2-5.6M36.6 25.3c-.5 0-1.3.1-2.4.3-.2 0-.3 0-.5.1-.5.1-1.1.1-1.9.1h-3.3c-1.2 0-2.8 0-4.2.4-.1 0-.1.1-.1.1s.1.1.2.1h.1c.6 0 1.1-.1 1.6-.1 1.8 0 3.1.3 4.3.6 1.1.3 2.2.6 3.7.6 1.6 0 2.8-.3 3.4-.9.2-.2.3-.4.2-.6-.2-.5-.3-.7-1.1-.7M9.4 25.3c-.7 0-.8.2-.9.6 0 .2.1.4.2.6.5.6 1.8.9 3.4.9 1.5 0 2.6-.3 3.7-.6 1.2-.3 2.5-.6 4.3-.6.5 0 1 0 1.6.1h.1c.1 0 .2 0 .2-.1 0 0 0-.1-.1-.1-1.4-.4-3-.4-4.2-.4h-3.3c-.8 0-1.4 0-1.9-.1-.2 0-.4 0-.5-.1-1.3-.1-2.1-.2-2.6-.2"></path>
            </g>
          </svg>
          <span className="border mr-4"></span>
          <svg
            width="140"
            height="62"
            viewBox="0 0 120 42"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-8"
          >
            <title>Service NSW</title>
            <path
              fill="#e31837"
              d="M20.8.2C9.3.2 0 9.5 0 21s9.3 20.8 20.8 20.8S41.6 32.5 41.6 21 32.3.2 20.8.2"
            ></path>
            <path
              fill="#003e7e"
              d="M48.6 17.1l1.9-2.2c1.3 1.1 2.7 1.7 4.3 1.7 1.3 0 2.1-.5 2.1-1.4 0-.8-.5-1.2-2.9-1.8-2.9-.7-4.8-1.5-4.8-4.4 0-2.6 2.1-4.3 5.1-4.3 2.1 0 3.9.7 5.4 1.8L58 8.8c-1.3-.9-2.5-1.4-3.8-1.4-1.2 0-1.9.6-1.9 1.3 0 .9.6 1.3 3.1 1.9 2.9.8 4.6 1.8 4.6 4.3 0 2.9-2.2 4.5-5.3 4.5-2.1 0-4.3-.8-6.1-2.3M61.1 13.7c0-3.2 2.2-5.8 5.5-5.8 3.7 0 5.4 2.9 5.4 6v.8h-7.7c.3 1.4 1.3 2.2 2.7 2.2 1.1 0 1.8-.3 2.7-1.1l1.8 1.6c-1 1.3-2.5 2.1-4.5 2.1-3.5-.1-5.9-2.4-5.9-5.8m7.8-.9c-.2-1.4-1-2.3-2.3-2.3-1.3 0-2.1.9-2.4 2.3h4.7zM73.4 8.2h3.1v2.2c.7-1.5 1.7-2.5 3.5-2.4v3.3h-.2c-2.1 0-3.4 1.3-3.4 3.9v4.1h-3.1V8.2zM81.1 8.2h3.4l2.4 7.4 2.5-7.4h3.3l-4.4 11.1h-2.8zM93.9 4.2h3.3V7h-3.3V4.2zm0 4H97v11h-3.1v-11zM98.2 13.7c0-3.2 2.4-5.8 5.8-5.8 2.1 0 3.4.7 4.4 1.9l-1.9 2.1c-.7-.7-1.4-1.2-2.5-1.2-1.6 0-2.7 1.4-2.7 3 0 1.7 1.1 3 2.8 3 1.1 0 1.8-.5 2.5-1.2l1.8 1.9c-1.1 1.2-2.3 2-4.5 2-3.2 0-5.7-2.5-5.7-5.7M109.2 13.7c0-3.2 2.2-5.8 5.5-5.8 3.7 0 5.4 2.9 5.4 6v.8h-7.7c.3 1.4 1.3 2.2 2.7 2.2 1.1 0 1.8-.3 2.7-1.1l1.8 1.6c-1 1.3-2.5 2.1-4.5 2.1-3.5-.1-5.9-2.4-5.9-5.8m7.7-.9c-.2-1.4-1-2.3-2.3-2.3-1.3 0-2.1.9-2.4 2.3h4.7zM49.1 22.4H52l6.7 8.9v-8.9h3.1v14.4h-2.7l-6.9-9.1v9.1h-3.1zM63.9 34.7l1.9-2.2c1.3 1.1 2.6 1.7 4.3 1.7 1.3 0 2.1-.5 2.1-1.4 0-.8-.5-1.2-2.9-1.8-2.9-.7-4.8-1.5-4.8-4.4 0-2.6 2.1-4.3 5-4.3 2.1 0 3.9.7 5.3 1.8l-1.6 2.4c-1.3-.9-2.5-1.4-3.7-1.4-1.2 0-1.8.6-1.8 1.3 0 .9.6 1.3 3.1 1.9 2.9.8 4.6 1.8 4.6 4.3 0 2.9-2.2 4.5-5.3 4.5-2.3-.1-4.5-.9-6.2-2.4M76 22.4h3.4l2.9 9.8 3.3-9.8h2.7l3.2 9.8 3-9.8h3.3l-4.9 14.5h-2.8l-3.2-9.4-3.3 9.4h-2.7z"
            ></path>
            <g fill="#fff">
              <path d="M33.8 25.6c-.2-.3-.6-.6-1-.6h-2.1c-.9 0-2.3.1-4.1.2-.1 2.1-.2 4.1-.5 6 1.4.5 2.9 1.2 4.4 2 2.9-3.7 3.4-6.2 3.5-6.8 0-.3-.1-.6-.2-.8M15.9 22.4c-.1-.2-.2-.5-.4-.5-.1 0-.2 0-.3.1 0 0-.1.1-.3.2-.2.2-.5.4-.9.7-.5.5-1.6 1.4-2.8 2.8-1.6 1.8-3.7 4.4-5 7.5 2.5 2.9 5.8 5.1 9.7 6.1.6-2.2.9-4.9.9-7.8 0-3.9-.6-7.3-.8-8.6-.1-.2-.1-.5-.1-.5M8.2 16.7l-.3-.6s0-.1-.1-.1l-.3-.6c-.7-1.3-1.3-2.4-1.7-3-.2-.3-.3-.5-.3-.5-.2-.3-.4-.3-.4-.3-.1 0-.3.1-.4.3 0 0-.1.2-.3.5l-.9 1.5c-.1.1-.1.2-.2.3 0 0-.1.1-.1.2v.1c-.2.1-.4.5-.7.9-.5 1.8-.8 3.7-.8 5.6 0 4.2 1.3 8 3.6 11.2 1.3-2.8 3.3-5.6 5.9-8.3-.9-2.7-2-5.2-3-7.2"></path>
              <path d="M25 19.2c0-.3-.1-.6-.1-.8v-.2-.1-.1-.1-.1-.2-.1-.1c-.1-.5-.3-.7-.7-.7-.1 0-.2 0-.4.1 0 0-.2.1-.5.2s-.8.3-1.3.6l-.2.1c-.3.2-.7.3-1 .5-1.4.7-2.7 1.4-4 2.2-.2.1-.4.2-.5.3.5.2.9.8 1 1.4v.1c.2 1.1 1 5 1 9.6 0 3-.3 5.7-1 8.1 1.2.2 2.4.3 3.6.3h.8c.1-.1.1-.2.2-.3 2.8-4.9 3.4-11.3 3.4-15.8 0-1.8-.1-3.4-.3-4.9M25.8 32.6c-.6 2.8-1.4 5.3-2.5 7.4 3.6-.5 6.8-1.9 9.5-4-.8-.5-1.8-1-2.9-1.6-1.4-.7-2.8-1.3-4.1-1.8M10 17.2c.7 1.6 1.4 3.2 2 4.8 1.5-1.2 3.1-2.2 4.9-3.3 0-.1 0-.2-.1-.3 0-.1-.1-.3-.1-.4 0-.1-.1-.3-.1-.4-.4-1.7-.8-3-1-3.8v-.1-.1-.1c-.1-.4-.4-.6-.7-.6h-.1c-.1 0-.2.1-.3.1 0 0-.7.5-1.9 1.3-.6.5-1.6 1.2-2.8 2.2 0 .2.1.4.2.7z"></path>
            </g>
          </svg>
        </div>
        <h1 className="font-bold mb-5 text-3xl">
          Welcome to the Service NSW Logbook
        </h1>
        <h2 className="font-bold mb-5 text-3xl">
          Please{" "}
          <span
            onClick={() => navigate("/login")}
            className="hover:underline cursor-pointer text-blue-600"
          >
            Login
          </span>{" "}
          or{" "}
          <span
            onClick={() => navigate("/register")}
            className="hover:underline cursor-pointer text-red-600"
          >
            Register
          </span>{" "}
          to continue
        </h2>
      </div>
    );
  }

  const userInfo = parseJwt(token);

  return (
    <div className="flex flex-col justify-center w-full p-14">
      <h1 className="font-bold mb-5 text-3xl">Hello, {userInfo.name}</h1>
      <h2 className="mb-10 text-1xl">Account Email: {userInfo.email}</h2>

      <div className="servicesContainer">
        <h2 className="font-bold mb-10 text-2xl">Current Services</h2>

        {userInfo.roles.includes("CSR") ? (
          <ServiceCard
            title="Licensing Services"
            elements={[{ value: "View a customer's license information" }]}
            url={"searchCustomer"}
            buttonText={"Search Customer"}
          />
        ) : null}

        {userInfo.roles.includes("learners") &&
        !userInfo.roles.includes("provisional") ? (
          <ServiceCard
            title="Logbook Service"
            elements={[{ key: "License Status: ", value: userInfo.roles[1] }]}
            url={"logbook"}
            buttonText={"View Logbook"}
          />
        ) : null}

        {userInfo.roles.includes("provisional") &&
        userInfo.roles.includes("learners") ? (
          <ServiceCard
            title="License Information"
            elements={[{ key: "License Status: ", value: userInfo.roles[2] }]}
          />
        ) : null}

        {!userInfo.roles.includes("CSR") &&
        !userInfo.roles.includes("learners") &&
        !userInfo.roles.includes("provisional") ? (
          <ServiceCard title="No Available Services" elements={[]} />
        ) : null}
      </div>
    </div>
  );
}

export default Homepage;
