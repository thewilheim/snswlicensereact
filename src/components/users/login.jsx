import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../../web-services";
import "../mainStyle.css";

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
    <div className="viewContainerMain">
      <div className="viewContainerBorder">
        <h1 className="headingContainer">Login</h1>
        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="labelHeaderStyle">
              Username
            </label>
            <input
              type="email"
              className="inputContainer"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="password" className="labelHeaderContainer">
                Password
              </label>
              <input
                type="password"
                className="inputContainer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <a href="#" className="text-xs text-black-600 hover:underline">
              Forget Password?
            </a> */}
            <div className="mt-6">
              <button className="btn-red-main" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-black-700">
          {" "}
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
