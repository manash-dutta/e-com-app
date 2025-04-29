import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
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
  const [userInput, setUserInput] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const navigate = useNavigate();

  const { user, logOut } = useAuth();

  const { productData, setSearchedProduct, isTablet } = useProducts();

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
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (userInput.trim() === "") {
        setSearchedProduct(productData);
      } else {
        setSearchedProduct(searchedProducts);
        navigate("/");
      }
      setSearchedProducts([]);
    }
    if (e.key === "Escape") {
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
          toast.success("You have successfully logged out.", {
            onClose: () => navigate("/"),
          });
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
      <nav className={style.navWrapper}>
        <div className={style.logo} onClick={() => navigate("/")}>
          BusyBuy
        </div>
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
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            <div className={style.link}>
              <button className={style.btn}>
                <FontAwesomeIcon icon={faHouse} className={style.linkIcon} />
                {!isTablet && "Home"}
              </button>
            </div>
          </NavLink>
          {user && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              <div className={style.link}>
                <button className={style.btn}>
                  <FontAwesomeIcon
                    icon={faBasketShopping}
                    className={style.linkIcon}
                  />

                  {!isTablet && "My Orders"}
                </button>
              </div>
            </NavLink>
          )}

          {user && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              <div className={style.link}>
                <button className={style.btn}>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className={style.linkIcon}
                  />
                  {!isTablet && "Cart"}
                </button>
              </div>
            </NavLink>
          )}

          <div className={style.link} onClick={handleLogOut}>
            <button className={style.btn}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className={style.linkIcon}
              />

              {!isTablet && (user ? "Sign Out" : "Sign in")}
            </button>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
