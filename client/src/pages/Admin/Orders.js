import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import moment from "moment";
import axios from "axios";
import { Loader } from "../../components/Loader";
import { Select } from "antd";
import { toast } from "react-toastify";

const { Option } = Select;
const Orders = () => {
  const [order, setOrder] = useState([]);
  const [value, setValue] = useState([
    "Not Process",
    "Process",
    "Delivered",
    "cancel",
  ]);
  const [status, setStatus] = useState();
  const [api, setApi] = useState(false);

  //Getting order from mongobd
  const getOrder = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/admin/order");
      if (data?.success) {
        setOrder(data?.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update status in mongodb
  const statusHandler = async (v, id) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/admin/order/status/${id}`,
        { status: v }
      );
      if (data?.success) {
        setStatus(v);
        toast.success("Updated Status successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occur");
    }
  };

  //Delete Product in order
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/auth/admin/order/delete/${id}`
      );
      if (data?.success) {
        setApi(!api);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, [status, api]);
  return (
    <>
      <Layout title={"admin product"}>
        <div className="container-fluid m-3 p-3 overflow-scroll">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-8 bg-primary py-3">
              <h1 className="text-center text-light">All Orders</h1>

              {order.length < 1 ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "100vh" }}
                >
                  <Loader height={200} />
                </div>
              ) : (
                <>
                  {order.map((o, i) => {
                    return (
                      <>
                        <div className="border shaadow mt-5 bg-light">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Status</th>
                                <th scope="col">Buyer</th>
                                <th scope="col">Date</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              <td className="fs-6 fs-md-3">{i + 1}</td>
                              <td className="fs-6 fs-md-3">
                                <Select
                                  defaultValue={o?.status}
                                  onChange={(Value) =>
                                    statusHandler(Value, o?._id)
                                  }
                                >
                                  {value.map((s, index) => {
                                    return (
                                      <Option key={index} value={s}>
                                        {s}
                                      </Option>
                                    );
                                  })}
                                </Select>
                              </td>
                              <td className="fs-6 fs-md-3">{o?.buyer?.name}</td>
                              <td className="fs-6 fs-md-3">
                                {moment(o?.createAt).fromNow()}
                              </td>
                              <td className="fs-6 fs-md-3">
                                {o?.payment?.success ? "success" : "Failed"}
                              </td>
                              <td className="fs-6 fs-md-3">
                                {o?.products?.length}
                              </td>
                            </tbody>
                          </table>
                          {o?.products.map((p) => {
                            return (
                              <>
                                <div className="d-flex justify-content-between m-2 border border-gray p-2 p-sm-3 row">
                                  <div className="col-12 col-md-5">
                                    <img
                                      src={`/api/v1/product/product-photo/${p._id}`}
                                      alt={"product"}
                                      className="order_image"
                                    />
                                  </div>
                                  <div className="col-12 col-md-7">
                                    <p className="fs-6 fs-md-6 fs-lg-4">
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
                                    <p className="fs-6 fs-lg-4">
                                      {p.description.slice(0, 50)}
                                    </p>
                                    <p className="fs-4 fs-lg-3">
                                      <span className="fs-3  fw-fw-bolder">
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
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-danger m-2"
                              onClick={() => deleteHandler(o?._id)}
                            >
                              Deleted
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
