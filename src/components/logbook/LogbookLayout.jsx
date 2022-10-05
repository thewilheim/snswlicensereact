import React, { useEffect } from "react";
import { parseJwt } from "../../web-services";
import LogbookEntries from "./LogbookEntries";
import "./logbookStyle.css";

function LayoutPage() {
  const token = localStorage.getItem("token");
  const userInfo = parseJwt(token);

  useEffect(() => {
    document.title = "Logbook | Service NSW Demo";

    const logbook = document.querySelector(".LogbookLink");

    if (logbook) {
      logbook.classList.add("font-bold");
    }

    return function cleanup() {
      if (logbook) {
        logbook.classList.remove("font-bold");
      }
    };
  }, []);

  return (
    <main className="logbookContainer">
      <h1 className="text-3xl font-bold">My Logbook</h1>
      {userInfo.roles.includes("learners") ? (
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
