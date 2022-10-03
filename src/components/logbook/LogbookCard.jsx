import React from "react";
import "./logbookStyle.css";

function LogbookCard({
  startTime,
  endTime,
  totalMilliseconds,
  instructorLed,
  deleteEntry,
  convertTime,
  _id,
}) {
  return (
    <div className="entryCard">
      <h1 className="font-bold mb-5">Logbook Entry</h1>
      <p className="mb-4">
        <strong className="font-semibold">Instructor Led:</strong>{" "}
        {instructorLed ? "Yes" : "No"}
      </p>
      <div className="flex justify-between mb-4">
        <p>
          <strong className="font-semibold">Start Time:</strong> <br />
          {startTime}
        </p>
        <p>
          <strong className="font-semibold">End Time:</strong> <br />
          {endTime}
        </p>
      </div>
      <p className="mb-4">
        <strong className="font-semibold">Total Hours:</strong>{" "}
        {convertTime(totalMilliseconds)}
      </p>

      <div>
        <button
          className="font-semibold text-[#2E78C4] hover:text-slate-700"
          onClick={() => deleteEntry(totalMilliseconds, _id, startTime)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LogbookCard;
