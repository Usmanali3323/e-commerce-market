import React from "react";
import { Link } from "react-router-dom";
function Footer(props) {
  return (
    <div className="footer">
      <h4 className="text-center fs-6 fs-md-1">
        All Right Reserved &copy; Usman Ali
      </h4>
      <p className="text-center mt-3">
        <Link to={"/about"}>About</Link>|<Link to={"/contact"}>Contact</Link>|
        <Link to={"/developer"}>Developer</Link>
      </p>
    </div>
  );
}

export default Footer;
