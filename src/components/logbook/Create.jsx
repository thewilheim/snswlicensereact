import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEntry, parseJwt } from "../../web-services";
import "../mainStyle.css";

export default function Create() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userInfo = parseJwt(token);

  const [user, setUser] = useState({
    startTime: "",
    endTime: "",
    instructorLed: false,
  });

  const calculateTotal = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let secondsDiff = endDate.getTime() - startDate.getTime();
    secondsDiff = secondsDiff / 1000;
    const minuteDifference = secondsDiff / 60;

    if (user.instructorLed) {
      return minuteDifference + 180;
    } else {
      return minuteDifference;
    }
  };

  function add() {
    addEntry(user).then((response) => {
      if (response.ok) {
        alert("Logbook Entry Added");
        navigate("/logbook");
      } else {
        alert(response.status);
      }
    });
  }

  return (
    <div className="viewContainerMain">
      <div className="viewContainerBorder">
        <h1 className="headingContainer"></h1>

        <form
          onSubmit={(e) => {
            add();
            e.preventDefault();
          }}
        >
          <label htmlFor="" className="labelHeaderContainer">
            Start Time:
          </label>
          <input
            type="datetime-local"
            className="inputContainer"
            onChange={(e) => setUser({ ...user, startTime: e.target.value })}
            value={user.startTime}
          />
          <br />
          <label htmlFor=""
          className="labelHeaderContainer">End Time:</label>
          <input
            type="datetime-local"
            className="inputContainer"
            onChange={(e) => setUser({ ...user, endTime: e.target.value })}
            value={user.endTime}
            min={user.startTime}
            required
          />
          <br />
          <label htmlFor=""
          className="text-sm text-black mr-5">Instructor Led:</label>
          <input
            type="checkbox"
            onChange={() =>
              setUser({ ...user, instructorLed: !user.instructorLed })
            }
            value={user.instructorLed}
          />
          <div className="mt-6">
            <button className="btn-red-main">
              Add
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}
