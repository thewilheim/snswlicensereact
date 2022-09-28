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

  function find() {
    findEntry(user).then((response) => {
      if (response.ok) {
        alert("User Found!");
      } else {
        alert(response.status);
      }
    });
  }

  return (
    <form onClick={(e) => {
      e.preventDefault()
    }}>
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
      />
      <br />
      <label htmlFor="">Mobile Number:</label>
      <input
        type="phone"
        onChange={(e) => setUser({ ...user, mobile: e.target.value })}
        value={user.mobile}
      />
      <button onClick={() => {
        find()
        foundResult(user)
      }}>Search</button>
    </form>
  );

  function foundResult({user}) {
    return (
      <div>
        <h2>Results</h2>
        <table style="width:100%">
          <tr>
            <th>Search Criteria</th>
            <th>Customer Details</th>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{user.dateOfBirth}</td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>{user.mobile}</td>
          </tr>
        </table>
      </div>
    );
  }
}
