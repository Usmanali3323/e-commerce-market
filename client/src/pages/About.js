import React from "react";
import Layout from "../components/layout/Layout";

function About() {
  return (
    <Layout title={"about us"} center={true}>
      <div className="about row mt-lg-5 mx-lg-5 ">
        <div className="about_img col-12 col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="https://socialvignerons.com/wp-content/uploads/2015/07/Read-About-Us.jpg"
            alt="about"
          />
        </div>
        <div className="about_info col-10 col-md-5 mx-3 m-md-0">
          <h1 className="p-0">About Us</h1>
          <p style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
