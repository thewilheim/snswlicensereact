import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, parseJwt, server } from "../web-services";
import ServiceCard from "./ServiceCard";

function Homepage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return (
      <h1 className="font-bold mb-5 text-3xl">Please Log in to continue</h1>
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

        {userInfo.roles.includes("learners") ? (
          <ServiceCard
            title="Logbook Service"
            elements={[
              { key: "License Number: ", value: "123456" },
              { key: "License Status: ", value: userInfo.roles[1] },
            ]}
            url={"logbook"}
            buttonText={"View Logbook"}
          />
        ) : null}

        {!userInfo.roles.includes("CSR") &&
        !userInfo.roles.includes("learners") ? (
          <ServiceCard title="No Avaliable Services" elements={[]} />
        ) : null}
      </div>
    </div>
  );
}

export default Homepage;
