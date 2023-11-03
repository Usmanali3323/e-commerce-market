import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Loader } from "../components/Loader";
import { Link } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";

function ProductInfo() {
  const [product, setProduct] = useState({});
  const [relProduct, setrelProduct] = useState([]);
  const [load, setLoad] = useState(true);
  const { slug } = useParams();
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);
  const [cart, setCart] = useCart();

  const GetProduct = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      if (data.success) {
        setProduct({ ...data.product });
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(true);
    }
  };

  //Description handler
  const descriptionHandler = () => {
    setShow(!show);
  };

  const relatedProduct = async () => {
    try {
      setReload(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/reated-product/${product._id}/${product.category._id}`
      );
      if (data.success) {
        setReload(false);
        setrelProduct([...data.product]);
      }
    } catch (error) {
      console.log(error);
      setReload(false);
    }
  };

  useEffect(() => {
    GetProduct();
  }, []);
  useEffect(() => {
    relatedProduct();
  }, [product]);

  return (
    <Layout title={"product"}>
      {load ? (
        <div
          className="m-5 d-flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <Loader height={"8rem"} />
        </div>
      ) : (
        <>
          <div className="row my-4">
            <div className="col-11 col-md-5 d-flex flex-column align-items-center">
              {product?._id ? (
                <img
                  src={`/api/v1/product/product-photo/${product?._id}`}
                  alt="product"
                  className="mb-5 ms-md-3 col-8  img-thumbnail"
                />
              ) : (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              <h2 className="fs-3 p-2" style={{ textAlign: "justify" }}>
                {product?.name}
              </h2>
              <p className="fs-2 p-2 fw-bold">
                Price : <span className="text-success">${product?.price}</span>
              </p>
            </div>
            <div className="col-11 col-md-6 mx-2 mx-md-0 ">
              <p className="fs-5 " style={{ textAlign: "justify" }}>
                {show
                  ? product?.description
                  : product?.description.slice(0, 500)}
                <span
                  className="text-primary f-6 m-2"
                  style={{ cursor: "pointer" }}
                  onClick={descriptionHandler}
                >
                  {show ? "less" : "show more"}
                </span>
              </p>
              <p className="fs-2">Category : {product?.category?.name}</p>
              <p className="fs-2">
                Shipping :{" "}
                {product?.shipping ? "Availiable" : "Not Available yet"}
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  setCart([...cart, product]);
                  toast.success("successfully added");
                }}
              >
                Add to Card
              </button>
            </div>
          </div>
          <hr />
          <h1 className="text-center">Similar Products</h1>
          <div className="my-5 m-sm-5">
            {reload ? (
              <div className="d-flex justify-content-center">
                <Loader height={"5rem"} grow={true} />
              </div>
            ) : (
              <div className="d-flex flex-wrap justify-content-center">
                {relProduct.length < 1 ? (
                  "Similar Product Not Found"
                ) : (
                  <>
                    {relProduct?.map((p) => {
                      return (
                        <>
                          <div
                            key={p?._id}
                            className="card my-2 m-sm-2 "
                            style={{ width: 300 }}
                          >
                            <div className="d-flex justify-content-center mt-2">
                              <div style={{ width: 200 }}>
                                <img
                                  src={`/api/v1/product/product-photo/${p?._id}`}
                                  className="card-img-top"
                                  alt="product"
                                  width={100}
                                  height={200}
                                />
                              </div>
                            </div>
                            <div className="card-body">
                              <h6 className=" m-0 p-0 card-title">
                                {p?.name.slice(0, 60)}...
                              </h6>
                              <p className="card-text fs-4 m-2 p-0 fw-bold text-success">
                                ${p?.price}
                              </p>
                              <Link to={`/product/${p.slug}`}>
                                <button className="btn btn-primary  me-2">
                                  More Detail
                                </button>
                              </Link>
                              <button
                                className="btn btn-secondary"
                                onClick={() => {
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, p])
                                  );
                                  setCart([...cart, p]);
                                  toast.success("successfully added");
                                }}
                              >
                                Add to Card
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default ProductInfo;
