import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../web-services";

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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white border-t border-blue-300 rounded shadow-lg shadow-blue-600/80 lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-black-700">
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
              className="block text-sm font-medium text-black-700 undefined"
            >
              First Name:
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              className="block text-sm font-medium text-black-700 undefined"
            >
              Last Name:
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              value={user.lastName}
              required
            />
            <br />
            <label
              htmlFor=""
              className="block text-sm font-medium text-black-700 undefined"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
              value={user.dateOfBirth}
              required
            />
            <br />
            <label
              htmlFor=""
              className="block text-sm font-medium text-black-700 undefined"
            >
              Email:
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              required
            />
            <br />
            <label
              htmlFor=""
              className="block text-sm font-medium text-black-700 undefined"
            >
              Mobile Number:
            </label>
            <input
              type="phone"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              value={user.mobile}
              required
            />
            <br />
            <label
              htmlFor=""
              className="block text-sm font-medium text-black-700 undefined"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              required
            />
            <br />
            <div className="flex items-center mt-4">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none"
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
