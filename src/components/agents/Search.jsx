import { React, useEffect, useState } from "react";
import { findEntry } from "../../web-services";
import AlertComponent from "../AlertComponent";
import "../mainStyle.css";
import Results from "./Results";

export default function Search() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobile: "",
    email: "",
  });

  const [hasError, setHasError] = useState(false);

  const [userData, setUserData] = useState({});

  const [hasResult, setHasResult] = useState(false);

  function find() {
    findEntry(user)
      .then((response) => {
        if (!response.ok) {
          setHasError(true);
          setHasResult(false);
          setTimeout(() => {
            setHasError(false);
          }, 5000);
          throw new Error("No User Found");
        }

        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setHasResult(true);
      });
  }

  useEffect(() => {
    document.title = "Customer Search | Service NSW";
  }, []);

  return (
    <div className="viewMainContainer">
      <div className="viewBorderContainer">
        {hasError ? (
          <AlertComponent
            type={"error"}
            message={"No user found, please try again"}
          />
        ) : null}
        <h1 className="headingContainer">Search Customer</h1>
        <>
          <form
            className="mt-6"
            onSubmit={(e) => {
              find();
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
            />
            <br />
            <label htmlFor="" className="labelHeadingContainer">
              Mobile:
            </label>
            <input
              type="phone"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              value={user.mobile}
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
            />
            <div className="mt-6">
              <button className="btn-red-main">Search</button>
            </div>
          </form>
          {hasResult ? (
            <Results userData={userData} setHasResult={setHasResult} />
          ) : null}
        </>
      </div>
    </div>
  );
}
