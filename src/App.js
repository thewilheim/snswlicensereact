import { Route, Routes } from "react-router-dom";
import "./App.css";
import {Login, Register} from "./components/users"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
