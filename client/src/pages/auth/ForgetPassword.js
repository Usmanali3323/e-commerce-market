import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "../../style/authstyle.css";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forget-password", {
        email,
        newPassword,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
    <>
      <Layout title={"forget-Password E commerece App"}>
        <div className="register">
          <div className="p-5 reg_container">
            <h1>Forget Password</h1>
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
                  type="text"
                  className="form-control input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="exampleInputAddress"
                  placeholder="New Password"
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
                Update
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ForgetPassword;
