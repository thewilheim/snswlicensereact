import React from "react";
import { useNavigate } from "react-router-dom";

function ResultTable({ userData }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto relative">
      <table className="tableMainContainer">
        <thead className="tableBorderContainer">
          <tr className="border-b-2">
            <th scope="col" className="tableColumnHeading">
              First Name
            </th>
            <th scope="col" className="tableColumnHeading">
              Last Name
            </th>
            <th scope="col" className="tableColumnHeading">
              Date Of Birth
            </th>
            <th scope="col" className="tableColumnHeading">
              Email
            </th>
            <th scope="col" className="tableColumnHeading">
              Mobile
            </th>
            <th scope="col" className="tableColumnHeading">
              User Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            return (
              <tr className="bg-white tracking-wide" key={user.email}>
                <td className="tableRowStyling">{user.firstName}</td>
                <td className="tableRowStyling">{user.lastName}</td>
                <td className="tableRowStyling">{user.dateOfBirth}</td>
                <td className="tableRowStyling">{user.email}</td>
                <td className="tableRowStyling">{user.mobile}</td>
                <td className="tableRowStyling">
                  <button
                    className="btn-red-main"
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
