import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Checkbox, Radio, Select, Space } from "antd";
import { price } from "../components/price";
import { Loader } from "../components/Loader";
import { useCart } from "../context/Cart";
import Carousel from "../components/layout/Carousel";

const { Option } = Select;

function HomePage() {
  const [categories, setCategoris] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();

  //Getting All Category
  const GetCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data.success) {
        setCategoris([...data.category]);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  //Getting All Products
  const GetProducts = async () => {
    try {
      await GetCategories();
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      if (data.success) {
        setProducts([...data.products]);
        setLoad(false);
      }
    } catch (error) {
      console.log(error.message);
      console.log("coming error in Home page Getting Product");
    }
  };

  //Filter Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      if (data.success) {
        setProducts(data.product);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //getting total products
  const getTotalProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      if (data.success) setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  //loadmore product
  const loadMore = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoad(false);
      if (data.success) {
        setProducts([...products, ...data.products]);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      GetProducts();
    } else {
      if (checked.length || radio.length) {
        filterProduct();
      }
    }
  }, [checked, radio]);

  // useEffect(() => {}, [checked, radio]);
  useEffect(() => {
    getTotalProduct();
  }, [total]);

  //Loadmore
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"All Product - Best offer"}>

      <Carousel />

      <div className="row m-2">
        {window.screen.width > 700 ? (
          <div className="col-md-3 ">
            <h3>Filter by Category</h3>
            {/*filter product by category*/}
            {categories.length < 1 ? (
              <div className="m-5">
                <Loader height={"2rem"} />
              </div>
            ) : (
              <>
                {categories.map((c) => {
                  return (
                    <>
                      <div className="d-flex align-items-center">
                        <Checkbox
                          key={c._id}
                          onChange={(e) => {
                            handleFilter(e.target.checked, c._id);
                            setLoad(true);
                          }}
                        >
                          <p className="fs-md-4">{c.name}</p>
                        </Checkbox>
                      </div>
                    </>
                  );
                })}
              </>
            )}
            {/*filter product by price*/}
            <h3>Filter by Price</h3>
            <Radio.Group
              onChange={(e) => {
                setRadio(e.target.value);
                setLoad(true);
              }}
            >
              {price.map((p) => (
                <div key={p.id} className="my-2 fs-md-3">
                  <Radio value={p.array}>{p.range}</Radio>
                </div>
              ))}
            </Radio.Group>
            <div className="m-3">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="my-3 col d-flex justify-content-between">
              <Space wrap>
                <Select
                  defaultValue={"Categories"}
                  style={{ width: 110, color: "black" }}
                  onChange={(Value) => {
                    setChecked(Value);
                    setLoad(true);
                  }}
                >
                  {categories &&
                    categories?.map((c) => (
                      <>
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      </>
                    ))}
                </Select>
              </Space>
              <Space>
                <Select
                  wrap
                  defaultValue={"Price"}
                  style={{ width: 110 }}
                  onChange={(Value) => {
                    let arr = Value.split(",");
                    setRadio([...arr]);
                    setLoad(true);
                  }}
                >
                  {price.map((p, index) => (
                    <>
                      <Option key={index} value={p.array.toString()}>
                        {p.range}
                      </Option>
                    </>
                  ))}
                </Select>
              </Space>
            </div>
          </>
        )}
        <div className="d-flex flex-column col-md-9 home_page">
          <h1 className="text-center">All Product</h1>
          {load ? (
            <div
              className="m-5 d-flex align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <Loader height={"8rem"} />
            </div>
          ) : (
            <>
              {products.length < 1 ? (
                <h1 className="text-center text-danger my-5">
                  NOT Product Found
                </h1>
              ) : (
                <div className="d-flex flex-wrap justify-content-center product_scroll">
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
                              <button className="btn btn-primary me-2 cart_button">
                                More Detail
                              </button>
                            </Link>
                            <button
                              className="btn btn-secondary cart_button"
                              onClick={() => {
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, p])
                                );
                                setCart([...cart, p]);
                                toast.success("Product Added Successfully ");
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
              )}
            </>
          )}
          {checked.length < 1 && radio.length < 1 ? (
            <>
              {products.length < 1 ? (
                <></>
              ) : (
                <>
                  <div className="my-2">
                    {products && products.length < total ? (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        Loadmore
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
