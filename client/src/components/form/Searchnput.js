import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Searchnput = () => {
  const [values, setValues] = useSearch();
  const navigat = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keywords}`
      );
      if (data.success) {
        setValues({ ...values, product: [...data.product] });
        navigat("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex" onSubmit={submitHandler}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          values={values.keywords}
          onChange={(e) => setValues({ ...values, keywords: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default Searchnput;
