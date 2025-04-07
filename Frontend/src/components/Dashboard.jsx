import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuth from "./checkAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkLoggedIn = async () => {
      if (!token) {
        navigate("/login");
      }

      const isLoggedIn = await checkAuth();
      if (!isLoggedIn) {
        navigate("/login");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div>
      Youre on dashboard!
      <button onClick={logout}>Mag logout</button>
    </div>
  );
};

export default Dashboard;
