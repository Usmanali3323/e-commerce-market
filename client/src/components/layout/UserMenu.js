import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h2>User Panel</h2>
          <NavLink
            to={"/dashboard/user/profile"}
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to={"/dashboard/user/order"}
            className="list-group-item list-group-item-action"
          >
            Order
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
