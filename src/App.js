import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { Login, Register, Profile } from "./components/users";
import { Create, LayoutPage } from "./components/logbook";
import { logout } from "./web-services";
import Search from "./components/agents/Search";

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
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />}>
          <Route path="/create" element={<Create />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/logbook" element={<LayoutPage />} />
          <Route path="/searchCustomer" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
