import React from "react";
import { useNavigate } from "react-router-dom";

function LayoutPage() {
  const navigate = useNavigate();
  const roles = ["learnerLicense"];

  return (
    <main>
      {roles.includes("learnerLicense") ? (
        <div>
          License Number: XXXXXX
          <button onClick={() => navigate("/create")}>Log Hours</button>
        </div>
      ) : (
        <div>You dont have a licence</div>
      )}
    </main>
  );
}

export default LayoutPage;
