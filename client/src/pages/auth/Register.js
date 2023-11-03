import axios from "axios";
// import dotenv from "dotenv";
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import "../../style/authstyle.css";
import { useNavigate } from "react-router-dom";
// dotenv.config();
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        phone,
        password,
        address,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Register E commerece"}>
      <div className="register">
        <div className="p-3 reg_container">
          <h1>Register Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="exampleInputName"
                placeholder="Name"
                required
              />
            </div>
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
            <div className="mb-3">
              <input
                type="number"
                className="form-control input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="exampleInputPhone"
                placeholder="Phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="exampleInputAddress"
                placeholder="Address"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                id="exampleInputAddress"
                placeholder="What is your Favourite Sports"
                required
              />
            </div>
            <button type="submit" className="reg_btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
