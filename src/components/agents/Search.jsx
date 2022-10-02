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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white border-t border-orange-600 rounded shadow-lg shadow-orange-800/50 lg:max-w-md">
        <h1 className="text-3xl font-semibold text-left text-black-700">
          Search Customer
        </h1>
        <>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="" className="block text-sm text-black-800">
              First Name:
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              value={user.firstName}
              required
            />
            <br />
            <label htmlFor="" className="block text-sm text-black-800">
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
            <label htmlFor="" className="block text-sm text-black-800">
              Date of Birth:
            </label>
            <input
              type="date"
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
              value={user.dateOfBirth}
              required
            />
            <br />
            <label htmlFor="" className="block text-sm text-black-800">
              Email:
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              disabled
            />
            <br />
            <label htmlFor="" className="block text-sm text-black-800">
              Mobile Number:
            </label>
            <input
              type="phone"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              value={user.mobile}
              disabled
            />
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={() => {
                  find();
                }}
              >
                Search
              </button>
            </div>
          </form>

          {hasResult ? <FoundResult userData={userData} /> : null}
        </>
      </div>
    </div>
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
