import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findEntry, parseJwt } from "../../web-services";
import "../mainStyle.css";
import Results from "./Results";

export default function Search() {
  //   const token = localStorage.getItem("token");
  //   const userInfo = parseJwt(token);

  const navigate = useNavigate();

  const [showResults, setShowResults] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobile: "",
    email: "",
  });

  const [userData, setUserData] = useState({});

  const [hasResult, setHasResult] = useState(false);

  function find() {
    findEntry(user)
      .then((response) => {
        if (!response.ok) {
          alert("No User Found");
          setHasResult(false);
          throw new Error("No User Found");
        }

        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setHasResult(true);
      });
  }

  return (
    <div className="viewContainerMain">
      <div className="viewContainerBorder">
        <h1 className="headingContainer">Search Customer</h1>
        <>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="" className="labelHeadingContainer">
              First Name:
            </label>
            <input
              type="text"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              value={user.firstName}
              required
            />
            <br />
            <label htmlFor="" className="labelHeadingContainer">
              Last Name:
            </label>
            <input
              type="text"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              value={user.lastName}
              required
            />
            <br />
            <label htmlFor="" className="labelHeadingContainer">
              Date of Birth:
            </label>
            <input
              type="date"
              className="inputContainer"
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
              value={user.dateOfBirth}
              required
            />
            <br />
            <label htmlFor="" className="labelHeadingContainer">
              Email:
            </label>
            <input
              type="email"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              disabled
            />
            <br />
            <label htmlFor="" className="labelHeadingContainer">
              Mobile Number:
            </label>
            <input
              type="phone"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              value={user.mobile}
              disabled
            />
            <div className="mt-6">
              <button
                className="btn-red-main"
                onClick={() => {
                  find();
                }}
              >
                Search
              </button>
            </div>
          </form>
          {hasResult ? <Results userData={userData} /> : null}
        </>
      </div>
    </div>
  );
}


