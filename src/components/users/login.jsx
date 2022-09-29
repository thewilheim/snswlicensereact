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
    <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div class="w-full p-6 m-auto bg-white border-t border-blue-600 rounded shadow-lg shadow-blue-800/50 lg:max-w-md">
        <h1 class="text-3xl font-semibold text-left text-black-700">Login</h1>

        <form class="mt-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label for="email" class="block text-sm text-black-800">
              Username
            </label>
            <input
              type="email"
              class="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="mt-4">
            <div>
              <label for="password" class="block text-sm text-black-800">
                Password
              </label>
              <input
                type="password"
                class="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="#" class="text-xs text-gray-600 hover:underline">
              Forget Password?
            </a>
            <div class="mt-6">
              <button
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <p class="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="/register" class="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
