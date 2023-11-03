import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useSearch } from "../../context/Search";
import { Loader } from "../../components/Loader";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../../context/auth";

const UserOrder = () => {
  const [order, setOrder] = useState([]);
  const [auth] = useAuth();
  const [loader, setLoader] = useState(false);
  const getOrder = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get("/api/v1/auth/dashboard/user-order");
      if (data?.success) {
        setOrder([...data?.orders]);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    getOrder();
  }, [auth?.token]);
  return (
    <Layout title={"Dashboard-Order"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Order</h1>
            {loader ? (
              <div className="m-5 d-flex align-items-center justify-content-center">
                <Loader height={150} />
              </div>
            ) : (
              <>
                <div className="product_scroll">
                  {order?.map((o, i) => {
                    return (
                      <div className="border shaadow">
                        <table className="table">
                          <thead>
                            <tr>
                              <td scope="col">#</td>
                              <td scope="col">Status</td>
                              <td scope="col">Buyer</td>
                              <td scope="col">Date</td>
                              <td scope="col">Payment</td>
                              <td scope="col">Quantity</td>
                            </tr>
                          </thead>
                          <tbody>
                            <th className="fs-6 fs-md-3">{i + 1}</th>
                            <th className="fs-6 fs-md-3">{o?.status}</th>
                            <th className="fs-6 fs-md-3">{o?.buyer?.name}</th>
                            <th className="fs-6 fs-md-3">
                              {moment(o?.createAt).fromNow()}
                            </th>
                            <th className="fs-6 fs-md-3">
                              {o?.payment?.success ? "success" : "Failed"}
                            </th>
                            <th className="fs-6 fs-md-3">
                              {o?.products?.length}
                            </th>
                          </tbody>
                        </table>
                        {o?.products.map((p) => {
                          return (
                            <>
                              <div className="d-flex justify-content-between m-2 m-sm-5 border border-gray p-2 p-sm-3 row">
                                <div className="col-12 col-md-5">
                                  <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    alt={"product"}
                                    className="order_image"
                                  />
                                </div>
                                <div className="col-12 col-md-7">
                                  <p className="fs-5 fs-md-5 fs-lg-3">
                                    {p.name.length > 30 ? (
                                      <>
                                        {p.name.slice(0, 30)}
                                        <span className="text-primary">
                                          ...
                                        </span>
                                      </>
                                    ) : (
                                      p.name.slice(0, 30)
                                    )}
                                  </p>
                                  <p className="fs-5 fs-md-5 fs-lg-3">
                                    {p.description.slice(0, 50)}
                                  </p>
                                  <p className="fs-3 fs-md-4 fs-lg-2">
                                    <span className="fs-2 fs-md-2 fw-fw-bolder">
                                      Price :
                                    </span>
                                    <span className="fw-bold text-success">
                                      ${p.price}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
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

export default UserOrder;
