import axios from "axios";
// import dotenv from "dotenv";
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import "../../style/authstyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  console.log("inside Login Page : " + JSON.stringify(location));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    // axios.get(process.env.REACT_APP_API);
  };

  return (
    <Layout title={"Register E commerece"}>
      <div className="register">
        <div className="p-3 reg_container">
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                className="form-control input"
                onChange={(e) => setEmail(e.target.value)}
                id="exampleInputName"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="button"
              className="reg_btn"
              onClick={() => navigate("/forget-password")}
            >
              Reset Password
            </button>
            <button type="submit" className="reg_btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
