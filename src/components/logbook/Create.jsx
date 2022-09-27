import {React, useState} from "react";
import { useNavigate } from "react-router-dom";


export default function Create() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
      startTime: "",
      endTime: "",
      instructorLed: "",
    });

    function add(){
        
        addEntry({category})
        .then(r => r.json())
        .then(j => {
            alert("Logbook Entry: " + j._id + " has been added")
        })
        .catch(e => alert(e.message))
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
          onChange={(e) => setUser({ ...user, instructorLed: e.target.value })}
          value={user.instructorLed}
        />
        <br />
        <button type="Add">Add</button>
      </form>

    );

}