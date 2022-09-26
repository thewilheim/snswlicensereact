import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/users/Login";
import Register from "./components/users/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
