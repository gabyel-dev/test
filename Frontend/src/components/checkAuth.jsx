import axios from "axios";

const checkAuth = async () => {
  const token = localStorage.getItem("token");
  try {
    const url = import.meta.env.VITE_URL;
    const res = await axios.get(`${url}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.status === 200;
  } catch (err) {
    return false;
  }
};

export default checkAuth;
