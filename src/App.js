import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { Login, Register } from "./components/users";
import Create from "./components/logbook/Create";
import LogbookLayout from "./components/logbook/LogbookLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Homepage />}>
        <Route path="/create" element={<Create />} />
        <Route path="/logbook" element={<LogbookLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
