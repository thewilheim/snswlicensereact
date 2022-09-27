import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { Login, Register } from "./components/users";
import Create from "./components/logbook/Create";
import LogbookLayout from "./components/logbook/LogbookLayout";
import { logout } from "./web-services";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logOut() {
    logout();
    navigate("/");
  }

  return (
    <>
      <header>
        <nav>
          <div onClick={() => navigate("/logbook")}>Home</div>
          {token ? (
            <div>
              Logged in as John Doe -{" "}
              <button onClick={() => logOut()}>Log Out</button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />}>
          <Route path="/create" element={<Create />} />
          <Route path="/logbook" element={<LogbookLayout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
