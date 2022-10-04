import { React, useState } from "react";
import "../mainStyle.css";

export default function Results({ userData }) {

  return (
    <div class="flex flex-col mt-8">
      <div class="tableMainContainer">
        <div class="tableContainerBorder">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="tableColumnHeading">First Name</th>
                <th class="tableColumnHeading">Last Name</th>
                <th class="tableColumnHeading">Date of Birth</th>
                <th class="tableColumnHeading">Email Address</th>
                <th class="tableColumnHeading">Phone Number</th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr>
                <td>
                  <div class="ml-4">
                    <div class="tableRowStyling">{userData.firstName}</div>
                  </div>
                </td>
                <td>
                  <div className="ml-4">
                    <div class="tableRowStyling">{userData.lastName}</div>
                  </div>
                </td>
                <td>
                  <div className="ml-4">
                    <div class="tableRowStyling">{userData.dateOfBirth}</div>
                  </div>
                </td>
                <td>
                  <div className="ml-4">
                    <div class="tableRowStyling">{userData.email}</div>
                  </div>
                </td>
                <td>
                  <div className="ml-4">
                    <div class="tableRowStyling">{userData.mobile}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
