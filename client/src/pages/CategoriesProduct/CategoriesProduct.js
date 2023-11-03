import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/Cart";
import { toast } from "react-toastify";

const CategoriesProduct = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState();
  const [load, setLoad] = useState(true);
  const [cart, setCart] = useCart();
  const GetProduct = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(
        `/api/v1/product/product-category/${slug}`
      );
      if (data.success) {
        setProducts([...data?.product]);
        setLoad(false);
      }
    } catch (error) {
      console.log(error, "Error in Categories products");
      setLoad(false);
    }
  };

  useEffect(() => {
    GetProduct();
  }, [slug]);

  return (
    <>
      <Layout title="product-category" center={true}>
        {load ? (
          <div className="d-flex justify-content-center m-5">
            <Loader height={"5rem"} />
          </div>
        ) : (
          <>
            <h1 className="text-center m-3">
              Find Result{" "}
              <span className="text-uppercase">
                {products[0]?.category?.name}
              </span>
            </h1>
            <div className="d-flex flex-wrap m-md-5 justify-content-center product_scroll">
              {products?.map((p) => {
                return (
                  <>
                    <div
                      key={p?._id}
                      className="card m-2 "
                      style={{ width: 300, "max-height": 400 }}
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
                          <button className="btn btn-primary me-2">
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
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default CategoriesProduct;
