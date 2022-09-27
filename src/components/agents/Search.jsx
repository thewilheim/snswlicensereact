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
    email: "",
    mobile: "",
    dateOfBirth: "",
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
    <form>
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
    <label htmlFor="">Email Username:</label>
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
    <br />
    <button onClick={() => find()}>Search</button>
  </form>
  );
}
