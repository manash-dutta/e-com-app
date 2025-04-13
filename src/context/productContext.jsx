import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { db } from "../config/firebaseInit";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://fakestoreapi.com/products";
        const response = await axios.get(url);
        setProductData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider
      value={{ productData, searchedProduct, setSearchedProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
