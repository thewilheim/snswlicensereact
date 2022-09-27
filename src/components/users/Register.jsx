import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    dateOfBirth: "",
  });

  const registerUser = async () => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    navigate("/login");
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          registerUser();
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
        <label htmlFor="">Date:</label>
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
          required
        />
        <br />
        <label htmlFor="">Mobile:</label>
        <input
          type="phone"
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          value={user.mobile}
          required
        />
        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
