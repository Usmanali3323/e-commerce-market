import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import Searchnpt from "../form/Searchnput";
import useCategory from "../../Hook/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
function Header() {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [categoryName, setCategoryName] = useState("Category");
  const [cart, setCart] = useCart();

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("LogOut Successfully");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ backgroundColor: "#B0E0E6" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler mb-2 mb-md-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to={"/"} className="navbar-brand logo_sm">
            <FaShopify color="green" size={40} /> E Commerce
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={"/"} className="navbar-brand logo_lg">
              <FaShopify color="green" size={56} /> E Commerce
            </Link>

            <ul className="navbar-nav ms-auto my-2 my-lg-0">
              <li className="mx-md-5">
                <Searchnpt />
              </li>
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link ">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink
                  to={`/category`}
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categoryName}
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {categories.length > 0 &&
                    categories?.map((c) => {
                      return (
                        <li key={c._id}>
                          <NavLink
                            to={`/category/${c.slug}`}
                            className={"dropdown-item"}
                          >
                            {c.name}
                          </NavLink>
                        </li>
                      );
                    })}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/register"} className="nav-link ">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      to={"/"}
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user.role ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>

                      <li onClick={handleLogOut}>
                        <NavLink to={"/login"} className="dropdown-item">
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to={"/cart"} className="nav-link">
                  <Badge count={cart.length}>Cart</Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
