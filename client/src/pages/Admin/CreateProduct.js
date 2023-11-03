import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();
  //Get All Categories
  const getAllCategory = async () => {
    const { data } = await axios.get(`/api/v1/category/get-category`);
    if (data?.success) {
      setCategories(data.category);
    } else toast.error("something went wrong");
  };

  //create product in mongodb
  const handleform = async (e) => {
    try {
      e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      productData.append("category", category);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/product");
      } else {
        toast.error("Someting Wrong");
      }
    } catch (error) {
      toast.error("something wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <Layout title={"Dashboard create-category"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Mange Product</h1>
              <div className="m-3 w-75">
                <Select
                  mode="multiple"
                  placeholder="Select Category"
                  className="w-75 mb-3"
                  showSearch
                  size="large"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories.map((c) => (
                    <>
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    </>
                  ))}
                </Select>
                <div className="mb-3 w-75">
                  <label className="btn btn-outline-secondary col-md-12 ">
                    {photo ? photo.name : "Upload photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product"
                      height={200}
                      className="img img-responsive"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mb-3 mt-5">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control "
                    placeholder="write Name of Product"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control "
                    placeholder="write description"
                  />
                </div>
                <div className="mb-3 ">
                  <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control "
                    placeholder="write Product Price"
                  />
                </div>
                <div className="mb-3 ">
                  <input
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control "
                    placeholder="write a Product Quanitity"
                  />
                </div>
                <div className="mb-3 ">
                  <Select
                    bordered={false}
                    placeholder={"Select Sipping"}
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value={"0"}>No</Option>
                    <Option value={"1"}>Yes</Option>
                  </Select>
                </div>
                <button className="btn-primary btn text" onClick={handleform}>
                  create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
