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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white border-t border-red-600 rounded shadow-lg shadow-red-800/50 lg:max-w-md">
        <h1 className="text-3xl font-semibold text-left text-black-700"></h1>

        <form
          onSubmit={(e) => {
            add();
            e.preventDefault();
          }}
        >
          <label htmlFor="" className="block text-sm text-black-800">
            Start Time:
          </label>
          <input
            type="datetime-local"
            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={(e) => setUser({ ...user, startTime: e.target.value })}
            value={user.startTime}
          />
          <br />
          <label htmlFor="">End Time:</label>
          <input
            type="datetime-local"
            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={(e) => setUser({ ...user, endTime: e.target.value })}
            value={user.endTime}
            min={user.startTime}
            required
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
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none">
              Add
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}
