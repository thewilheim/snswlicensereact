import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEntry, parseJwt } from "../../web-services";

export default function Create() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userInfo = parseJwt(token);

  const [user, setUser] = useState({
    startTime: "",
    endTime: "",
    instructorLed: false,
    userEmail: userInfo.email,
  });

  function add() {
    addEntry(user).then((response) => {
      if (response.ok) {
        alert("Logbook Entry Added");
      } else {
        alert(response.status);
      }
    });
  }

  return (
    <form>
      <label htmlFor="">Start Time:</label>
      <input
        type="datetime-local"
        onChange={(e) => setUser({ ...user, startTime: e.target.value })}
        value={user.startTime}
      />
      <br />
      <label htmlFor="">End Time:</label>
      <input
        type="datetime-local"
        onChange={(e) => setUser({ ...user, endTime: e.target.value })}
        value={user.endTime}
      />
      <br />
      <label htmlFor="">Instructor Led</label>
      <input
        type="checkbox"
        onChange={() =>
          setUser({ ...user, instructorLed: !user.instructorLed })
        }
        value={user.instructorLed}
      />
      <br />
      <button onClick={() => add()}>Add</button>
    </form>
  );
}
