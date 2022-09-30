import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { Login, Register, Profile } from "./components/users";
import { Create, LayoutPage } from "./components/logbook";
import { logout, parseJwt } from "./web-services";
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
      <header className="text-white font-semibold">
        <div className="flex justify-end items-center bg-[#242934] h-16 px-14">
          {token ? (
            <div>
              {`Logged in as ${parseJwt(token).name}`} -{" "}
              <button onClick={() => logOut()}>Log Out</button>
            </div>
          ) : (
            <>
              <button className="pr-5" onClick={() => navigate("/login")}>
                Login
              </button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
        {token ? (
          <nav className="flex justify-start items-center text-[#242934] text-lg h-16 px-14 border-b-2 ">
            <div className="pr-5 cursor-pointer" onClick={() => navigate("/")}>
              Overview
            </div>
            {parseJwt(token).roles.includes("learners") ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/logbook")}
              >
                Logbook
              </div>
            ) : null}
          </nav>
        ) : null}
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/create" element={<Create />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/logbook" element={<LayoutPage />} />
        <Route path="/searchCustomer" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
