import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout(props) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keyword} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main
        className={
          props.center
            ? "d-flex flex-column justify-content-center align-items-center m-sm-2"
            : ""
        }
        style={{ minHeight: "70vh" }}
      >
        <ToastContainer />
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "E commerece App shop now",
  description: "mern stack project",
  keyword: "mern,react,node,mongodb",
  author: "Usman Ali",
};

export default Layout;
