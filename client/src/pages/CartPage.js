import React, { useEffect, useState } from "react";
import { useCart } from "../context/Cart";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Total price
  const totalPrice = () => {
    let total = 0;
    cart.length > 0 &&
      cart?.map((i) => {
        total = total + Number(i.price);
      });
    return total;
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  //handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //Remove item from cart
  const removeHandler = (i) => {
    try {
      console.log("index : " + i);
      cart.splice(i, 1);
      setCart([...cart]);
      let data = localStorage.getItem("cart");
      data = JSON.parse(data);
      data.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <>
      <Layout title={"product cart"}>
        <div className=" row d-flex justify-content-center m-2">
          <h1>Cart Product</h1>
          <div className="w-95 w-sm-70 col-12 col-sm-9 col-md-7 col-lg-6">
            {cart.length > 0 &&
              cart.map((p, i) => {
                return (
                  <div
                    key={p._id}
                    className="d-flex justify-content-between m-sm-3 border border-gray p-2 p-sm-3"
                  >
                    <div>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={"product"}
                        className="cart_image"
                      />
                    </div>
                    <div>
                      <h3 className="fs-4 fs-md-1">{p.category?.name}</h3>
                      <h3 className="fs-4 fs-md-1">${p.price}</h3>
                    </div>
                    <div className="d-flex flex-column">
                      <button
                        className="btn btn-danger mb-3 cart_input"
                        onClick={() => removeHandler(i)}
                      >
                        Remove Item
                      </button>
                      <Link to={`/product/${p.slug}`}>
                        <button className="btn btn-primary cart_input">
                          More Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-md-5">
            <h1>Cart Summary</h1>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h3>Total : ${totalPrice()} </h3>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-3">
              {auth?.token && clientToken && cart.length > 0 ? (
                <DropIn
                  options={{
                    authorization: clientToken,
                  }}
                  onInstance={(instanse) => setInstance(instanse)}
                />
              ) : (
                " "
              )}
              <button
                className="btn btn-primary"
                onClick={handlePayment}
                disabled={!instance || !auth?.user?.address}
              >
                {loading ? "Processing...." : "Make Payment"}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
