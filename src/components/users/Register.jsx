import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../web-services";
import "../mainStyle.css";

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

    const token = await response.json();

    localStorage.setItem("token", token);

    let payload = parseJwt(token);
    navigate("/");
  };

  return (
    <div className="viewContainerMain">
      <div className="viewContainerBorder">
        <h1 className="headingContainer">
          Register
        </h1>
        <div className="mt-6">
          <form
            action=""
            onSubmit={(e) => {
              registerUser();
              e.preventDefault();
            }}
          >
            <label
              htmlFor=""
              className="labelHeaderContainer"
            >
              First Name:
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                className="inputContainer"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                value={user.firstName}
                required
              />
            </div>
            <br />
            <label
              htmlFor=""
              className="labelHeaderContainer"
            >
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
            <label
              htmlFor=""
              className="labelHeaderContainer"
            >
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
            <label
              htmlFor=""
              className="labelHeaderContainer"
            >
              Email:
            </label>
            <input
              type="email"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              required
            />
            <br />
            <label
              htmlFor=""
              className="labelHeaderContainer"
            >
              Mobile Number:
            </label>
            <input
              type="phone"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              value={user.mobile}
              required
            />
            <br />
            <label
              htmlFor=""
              className="labelHeaderContainer"
            >
              Password
            </label>
            <input
              type="password"
              className="inputContainer"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              required
            />
            <br />
            <div className="flex items-center mt-4">
              <button
                className="btn-red-main"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
