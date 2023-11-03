import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spiner from "../Spiner";

export default function Private() {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const autCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth", {
        Headers: auth?.token,
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) autCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spiner />;
}
