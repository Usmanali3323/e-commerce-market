import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { toast } from "react-toastify";
import "../../style/authstyle.css";
import { useAuth } from "../../context/auth";

const UserProfile = () => {
  const [_id, setId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        address,
        phone,
        password,
        _id,
      });
      if (data?.success) {
        setAuth({ ...auth, user: data?.user });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.user;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("successfully updated Profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      setId(auth?.user?._id);
      setName(auth?.user?.name);
      setAddress(auth?.user?.address);
      setEmail(auth?.user?.email);
      setPhone(auth?.user?.phone);
      setPassword(auth?.user?.password);
    }
  }, [auth?.user]);
  return (
    <Layout title={"Dashboard-Profile"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-8 card user_Profile">
            <div className="p-4 p-sm-5 user_container">
              <h1>Update Profile</h1>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control user_input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="exampleInputName"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control user_input"
                    onChange={(e) => setEmail(e.target.value)}
                    id="exampleInputName"
                    placeholder="Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control user_input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control user_input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="exampleInputPhone"
                    placeholder="Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control user_input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="exampleInputAddress"
                    placeholder="Address"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="reg_btn"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
