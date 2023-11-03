import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";

const Product = () => {
  const [product, setProduct] = useState([]);
  //Getting All Product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProduct(data.product);
        console.log("product data : ", product);
      } else {
        toast.error("something going wrong in getting Product");
        console.log(console.error);
      }
    } catch (error) {
      toast.error("something going wrong in getting Product");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-md-3 p-md-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 bg-primary">
            <h1 className="text-center">All Product</h1>
            {product.length < 1 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <Loader height={200} />
              </div>
            ) : (
              <>
                <div className="d-flex flex-row flex-wrap justify-content-center justify-content-md-between">
                  {product.map((p) => {
                    return (
                      <Link
                        to={`/dashboard/admin/product/${p.slug}`}
                        className="product-link"
                      >
                        <div
                          className="card m-2"
                          style={{ width: "15rem", cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-center mt-2">
                            <div style={{ width: 200 }}>
                              <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt="..."
                                height={200}
                                width={200}
                              />
                            </div>
                          </div>
                          <div className="card-body">
                            <h6 className="card-title">
                              {p.name.slice(0, 60)}
                            </h6>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
