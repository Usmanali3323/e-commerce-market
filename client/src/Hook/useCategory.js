import axios from "axios";
import { useState, useEffect } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  const GetCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories([...data.category]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetCategories();
  }, []);
  return categories;
};

export default useCategory;
