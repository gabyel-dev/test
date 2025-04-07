import { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const url = import.meta.env.VITE_URL;
      const res = await axios.post(`${url}/register`, registerData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
    } catch {
      alert("failed to register");
    }
  };

  return (
    <div>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="username"
          value={registerData.username}
          onChange={handleRegisterChange}
          name="username"
        />
        <input
          type="password"
          placeholder="password"
          value={registerData.password}
          onChange={handleRegisterChange}
          name="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
