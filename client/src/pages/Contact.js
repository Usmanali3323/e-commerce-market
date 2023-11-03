import React from "react";
import Layout from "../components/layout/Layout";
import { TbMailForward } from "react-icons/tb";
import { BiPhoneCall, BiSupport } from "react-icons/bi";

function Contact() {
  return (
    <Layout title={"contact us"} center={true}>
      <div className="contact row mt-0 mt-md-5 mx-md-5">
        <img
          className="col col-md-6"
          src="https://www.voapps.com/wp-content/uploads/2019/12/blog-3.jpeg"
          alt="contact"
        />
        <div className="contact_info col col-md-6 m-3 m-md-0">
          <h1 className="p-0 m-0 my-5 my-md-0">Contact us</h1>
          <p className="fs-lg-1">
            Any query and info about product feel free to call anytime we 24x7
            availible
          </p>
          <div className="contact_link fs-lg-1">
            <p>
              <TbMailForward /> : ua0318855@gmail.com
            </p>
            <p>
              <BiPhoneCall /> : 318-0526027
            </p>
            <p>
              <BiSupport /> : 1800-0000-0000(toll free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
