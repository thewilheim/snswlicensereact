import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../../web-services";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, []);

  function login() {
    loginAsync(username, password)
      .then((j) => navigate("/"))
      .catch((e) => alert(e.message));
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button onClick={login}>Login</button>
      </form>
    </div>
  );
}
