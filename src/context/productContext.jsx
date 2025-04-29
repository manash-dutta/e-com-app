import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [isTablet, setIsTablet] = useState(false);
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

  useEffect(() => {
    const checkIfTablet = () => {
      setIsTablet(window.innerWidth <= 1000);
    };

    checkIfTablet();
    window.addEventListener("resize", checkIfTablet);
    return () => window.removeEventListener("resize", checkIfTablet);
  }, []);

  return (
    <ProductContext.Provider
      value={{ productData, searchedProduct, setSearchedProduct, isTablet }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
