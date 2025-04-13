import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  faHouse,
  faCartShopping,
  faBasketShopping,
  faRightToBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { useProducts } from "../../context/productContext";
import { useAuth } from "../../context/authContext";
import style from "./Nav.module.css";

const Nav = () => {
  const { user, error, logOut } = useAuth();
  
  // to track what user is typing in the input field of the search bar
  const [userInput, setUserInput] = useState("");
  // to track the products that matches to userInput
  const [searchedProducts, setSearchedProducts] = useState([]);

  const navigate = useNavigate();

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

  const handleLogOut = async () => {
    if (user) {
      const userChoice = confirm("Are you sure you want to log out?");
      if (userChoice) {
        try {
          await logOut();
          toast.success("You have successfully logged out.");

          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error.message);
          toast.error("Something went wrong during logout. Please try again.");
        }
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <nav>
        <div className={style.logo}>Busy Buy</div>
        <div className={style.searchContainer}>
          <div className={style.search}>
            <input
              type="text"
              placeholder="search"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={
                userInput && searchedProducts.length > 0
                  ? `${style.input} ${style.typing}`
                  : style.input
              }
              onBlur={() => setTimeout(() => setSearchedProducts([]), 200)}
              onKeyDown={handleKeyDown}
            />
            <button className={style.submitBtn} onClick={handleSubmitClick}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={style.searchIcon}
              />
            </button>
          </div>
          {userInput && searchedProducts.length > 0 && (
            <div className={style.searchDropdown}>
              {searchedProducts.map((product) => (
                <div
                  className={style.searchSuggestion}
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                >
                  {product.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.links}>
          <Link to="/">
            <div className={style.link}>
              <FontAwesomeIcon icon={faHouse} className={style.linkIcon} />
              <button className={style.btn}>Home</button>
            </div>
          </Link>
          {user && (
            <Link to="/orders">
              <div className={style.link}>
                <FontAwesomeIcon
                  icon={faBasketShopping}
                  className={style.linkIcon}
                />
                <button className={style.btn}>My Orders</button>
              </div>
            </Link>
          )}
          <div className={style.link}>
            <FontAwesomeIcon icon={faCartShopping} className={style.linkIcon} />
            <button className={style.btn}>Cart</button>
          </div>

          <div className={style.link} onClick={handleLogOut}>
            <FontAwesomeIcon
              icon={faRightToBracket}
              className={style.linkIcon}
            />
            <button className={style.btn}>
              {user ? "Sign Out" : "Sign in"}
            </button>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Outlet />
    </>
  );
};

export default Nav;
