import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf_status">404</h1>
        <h2>Oops! Page Not Found</h2>
        <button className="pnf_button">
          <Link to={"/"}>Go Back</Link>
        </button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
