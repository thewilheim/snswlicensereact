import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../web-services";
import LogbookCard from "./LogbookCard";
import "./logbookStyle.css";

function LogbookEntries() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${server}/license`, {
      method: "GET",
      headers: myHeaders,
    });

    const userLicense = await response.json();

    setUserData(userLicense);

    setTimeout(() => {
      setLoading(false);
    }, 50);
  };

  const convertTime = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;

    minutes = minutes % 60;

    return `${Math.round(hours)} hour and ${Math.round(minutes)} minutes`;
  };

  const convertDate = (date) => {
    const t = new Date(parseInt(date));
    return `${t.toLocaleDateString()} ${t.toLocaleTimeString()}`;
  };

  const deleteEntry = (total, id, startTime) => {
    const startHour = new Date(startTime).getHours();
    setUserData({
      ...userData,
      totalTime: userData.totalTime - total,
      totalNightTime:
        startHour >= 17
          ? userData.totalNightTime - total
          : userData.totalNightTime,
      practiceLogEntries: userData.practiceLogEntries.filter(
        (item) => item._id !== id
      ),
    });

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`${server}/logbook/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  if (loading) {
    return <h2>Loading Data...</h2>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between mb-10 mt-10">
        <div className="flex flex-row">
          <div>
            Total Hours Completed : {convertTime(userData.totalTime)}
            <div className="progressBar">
              <div
                className="progressBar-Blue"
                style={{ width: `${(userData.totalTime / 432000000) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="ml-6">
            Total Night Hours Completed : {convertTime(userData.totalNightTime)}
            <div className="progressBar">
              <div
                className="progressBar-Purple"
                style={{
                  width: `${(userData.totalNightTime / 72000000) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <button className="btn-red" onClick={() => navigate("/create")}>
          Add new
        </button>
      </div>
      <div className="entryContainer">
        {userData.practiceLogEntries.map((item) => {
          return (
            <LogbookCard
              startTime={convertDate(item.startTime)}
              endTime={convertDate(item.endTime)}
              instructorLed={item.instructorLed}
              totalMilliseconds={item.totalMilliseconds}
              deleteEntry={deleteEntry}
              convertTime={convertTime}
              _id={item._id}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default LogbookEntries;
