import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { Login, Register, Profile } from "./components/users";
import { Create, LayoutPage } from "./components/logbook";
import Search from "./components/agents/Search";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
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
