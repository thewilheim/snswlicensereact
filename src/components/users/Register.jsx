import { React, useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const registerUser = async () => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = response.json();

    console.log(data);
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
        />
        <label htmlFor="">Last Name:</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          value={user.lastName}
        />
        <label htmlFor="">Email:</label>
        <input
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
        />
        <label htmlFor="">Mobile:</label>
        <input
          type="phone"
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          value={user.mobile}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
