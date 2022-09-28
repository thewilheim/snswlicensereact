import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findEntry, parseJwt } from "../../web-services";

export default function Search() {
  //   const token = localStorage.getItem("token");
  //   const userInfo = parseJwt(token);

  const navigate = useNavigate();

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
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setHasResult(true);
      });
  }

  return (
    <>
      <form
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="">First Name:</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          value={user.firstName}
          required
        />
        <br />
        <label htmlFor="">Last Name:</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          value={user.lastName}
          required
        />
        <br />
        <label htmlFor="">Date of Birth:</label>
        <input
          type="date"
          onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
          value={user.dateOfBirth}
          required
        />
        <br />
        <label htmlFor="">Email:</label>
        <input
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          disabled
        />
        <br />
        <label htmlFor="">Mobile Number:</label>
        <input
          type="phone"
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          value={user.mobile}
          disabled
        />
        <button
          onClick={() => {
            find();
          }}
        >
          Search
        </button>
      </form>

      {hasResult ? <FoundResult userData={userData} /> : null}
    </>
  );

  function FoundResult(props) {
    const { userData } = props;
    return (
      <div>
        <h2>Results</h2>
        <table>
          <thead>
            <tr>
              <th>Search Criteria</th>
              <th>Customer Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{userData.firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{userData.lastName}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{userData.dateOfBirth}</td>
            </tr>
            <tr>
              <td>Email Address</td>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td>{userData.mobile}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
