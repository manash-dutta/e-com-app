import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";

import { useProducts } from "../../context/productContext";
import "./Nav.css";

const Nav = () => {
  // to track what user is typing in the input field of the search bar
  const [userInput, setUserInput] = useState("");
  // to track the products that matches to userInput
  const [searchedProducts, setSearchedProducts] = useState([]);

  const { productData, setSearchedProduct } = useProducts();

  useEffect(() => {
    const filteredProducts = productData.filter((product) =>
      product.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setSearchedProducts(filteredProducts);
    !userInput && setSearchedProducts([]);
  }, [userInput, productData]);

  const handleSubmitClick = () => {
    if (userInput.trim() === "") {
      setSearchedProduct(productData);
    } else {
      setSearchedProduct(searchedProducts);
    }
    setSearchedProducts([]);
    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (userInput.trim() === "") {
        setSearchedProduct(productData);
      } else {
        setSearchedProduct(searchedProducts);
      }
      setSearchedProducts([]);
    }
  };

  const handleSuggestionClick = (product) => {
    setUserInput(product.title);
    setSearchedProduct(product);
    setSearchedProducts([]);
  };

  return (
    <>
      <nav>
        <div className="logo">Busy Buy</div>
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              placeholder="search"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={
                userInput && !searchedProducts ? "input typing" : "input"
              }
              onBlur={() => setTimeout(() => setSearchedProducts([]), 200)}
              onKeyDown={handleKeyDown}
            />
            <button className="submit-btn" onClick={handleSubmitClick}>
              <i className="bx bx-search"></i>
            </button>
          </div>
          {userInput && searchedProducts.length > 0 && (
            <div className="search-dropdown">
              {searchedProducts.map((product) => (
                <div
                  className="search-suggestion"
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                >
                  {product.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="links">
          <button className="home-btn btn">
            <i className="bx bxs-home-smile"></i>
            Home
          </button>
          <button className="orders-btn btn">
            <i className="bx bxs-basket"></i>My Orders
          </button>
          <button className="cart-btn btn">
            <i className="bx bxs-cart-download"></i>Cart
          </button>
          <button className="login-logout-btn btn">
            <i className="bx bxs-door-open"></i>Logout
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
