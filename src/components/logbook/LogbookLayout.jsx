import React from "react";
import { parseJwt } from "../../web-services";
import LogbookEntries from "./LogbookEntries";
import "./logbookStyle.css";

function LayoutPage() {
  const token = localStorage.getItem("token");
  const userInfo = parseJwt(token);

  return (
    <main className="logbookContainer">
      <h1 className="text-3xl font-bold">My Logbook</h1>
      {userInfo.roles.includes("learnerLicense") ? (
        <LogbookEntries />
      ) : (
        <div className="mt-20">
          <h1 className="text-2xl font-bold">You dont have a licence</h1>
        </div>
      )}
    </main>
  );
}

export default LayoutPage;
