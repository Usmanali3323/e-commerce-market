import React from "react";
import Layout from "../components/layout/Layout";
import developer from "../images/developer.jpg";
const Developer = () => {
  return (
    <Layout center={true}>
      <div className="about mx-md-5 row my-5  d-flex justify-content-center align-items-center ">
        <div className="col-12 col-lg-5 text-center d-md-flex justify-content-md-center align-items-md-center">
          <div className="about_img ">
            <img
              className="border-2 rounded-circle"
              src={developer}
              alt="about"
            />
          </div>
        </div>
        <div className="about_info col-10 col-lg-6">
          <h1>About Me</h1>
          <p className="fs-6 fs-sm-5 fs-lg-2" style={{ textAlign: "justify" }}>
            Hi there, I'm Usman Ali, and I'm a MERN stack developer. I studied
            ADP in Computer Science. I enjoy making things work on the internet.
            I specialize in using MongoDB, Express.js, React, and Node.js to
            create websites that do cool stuff. While I'm not a designer, I'm
            really good at making websites work smoothly and helping users do
            what they need to do. I like working together with people to
            understand what they want and then turning those ideas into working
            websites.
          </p>

          <a href={`https://portflio-4ac1d.firebaseapp.com/`}>
            <h4>Get in touch with me</h4>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Developer;
