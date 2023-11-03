import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  //Add product in cart//
  const cartHandler = (p) => {
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    setCart([...cart, p]);
    toast.success("sucessfully product added");
  };
  return (
    <>
      <Layout title="search results">
        <div className="container">
          <div className="text-center">
            <h1>Search Results</h1>
            <h6>
              {values?.product.length < 1
                ? "No Products Found"
                : `Found ${values?.product.length}`}
            </h6>
            <div className="d-flex flex-wrap justify-content-center product_scroll">
              {values?.product.map((p) => {
                return (
                  <>
                    <div
                      key={p?._id}
                      className="card m-2 "
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
                        <p className="card-text fs-4 m-2 p-0">${p?.price}</p>
                        <Link to={`/product/${p.slug}`}>
                          <button className="btn btn-primary  me-2">
                            More Detail
                          </button>
                        </Link>
                        <button
                          className="btn btn-secondary"
                          onClick={() => cartHandler(p)}
                        >
                          Add to Card
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
