import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spiner from "../Spiner";

export default function AdminRoute() {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    try {
      const autCheck = async () => {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res?.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };
      if (auth?.token) autCheck();
    } catch (error) {
      console.log(error);
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spiner path="" />;
}
