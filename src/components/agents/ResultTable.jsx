import React from "react";
import { useNavigate } from "react-router-dom";

function ResultTable({ userData }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-black">
        <thead className="text-xs text-black uppercase bg-white ">
          <tr className="border-b-2">
            <th scope="col" className="py-3 px-6 bg-gray-50">
              First Name
            </th>
            <th scope="col" className="py-3 px-6">
              Last Name
            </th>
            <th scope="col" className="py-3 px-6 bg-gray-50">
              Date Of Birth
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6 bg-gray-50 ">
              Mobile
            </th>
            <th scope="col" className="py-3 px-6">
              User Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            return (
              <tr className="bg-white tracking-wide" key={user.email}>
                <td className="py-4 px-6 bg-gray-50">{user.firstName}</td>
                <td className="py-4 px-6">{user.lastName}</td>
                <td className="py-4 px-6 bg-gray-50 ">{user.dateOfBirth}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6 bg-gray-50 ">{user.mobile}</td>
                <td className="py-4 px-6">
                  <button
                    className="hover:underline hover:font-semibold"
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
