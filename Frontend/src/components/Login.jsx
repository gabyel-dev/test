import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuth from "./checkAuth";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_URL;
    console.log(url);

    try {
      if (loggingIn) return;
      setLoggingIn(true);

      const res = await axios.post(`${url}/login`, loginData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
      console.log(res.data);
    } catch {
      alert("failed to login");
    } finally {
      setLoggingIn(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkLoggedIn = async () => {
      if (!token) {
        navigate("/login");
      }
      const isLoggedIn = await checkAuth();
      if (isLoggedIn) {
        navigate("/dashboard");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          value={loginData.username}
          onChange={handleRegisterChange}
          name="username"
        />
        <input
          type="password"
          placeholder="password"
          value={loginData.password}
          onChange={handleRegisterChange}
          name="password"
        />
        <button type="submit" disabled={loggingIn}>
          {loggingIn ? "LogginIn" : "Login"}
        </button>
      </form>
    </div>
  );
}
