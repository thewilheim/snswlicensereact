import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, parseJwt, server } from "../web-services";
import ServiceCard from "./ServiceCard";

function Homepage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Overview | Service NSW Demo";
  }, []);

  if (!token) {
    return (
      <div className="flex justify-center flex-col items-center mt-80">
        <h1 className="font-bold mb-5 text-3xl">
          Welcome to the Service NSW Logbook
        </h1>
        <h2 className="font-bold mb-5 text-3xl">
          Please <Link to="/login">Login</Link> or{" "}
          <Link to="/register">Register</Link> to continue
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
