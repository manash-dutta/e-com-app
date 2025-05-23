import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import style from "./SideBar.module.css";
import { useProducts } from "../../context/productContext";

const SideBar = () => {
  const [priceRange, setPriceRange] = useState(80000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const { productData, setSearchedProduct, isTablet } = useProducts();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    console.log("ToggleMenu called");
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== value)
      );
    }
  };

  useEffect(() => {
    let filteredProducts = productData;
    // filter by categories
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // filter by price
    filteredProducts = filteredProducts.filter(
      (product) => product.price * 80 <= priceRange
    );

    setSearchedProduct(filteredProducts);
  }, [priceRange, selectedCategories, productData, setSearchedProduct]);

  return (
    <div className={style.sidebarWrapper}>
      {isTablet && (
        <button className={style.menuButton} onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={menuActive ? faTimes : faBars}
            className={style.menuIcon}
          />
        </button>
      )}

      <div
        className={`${style.container} ${
          isTablet && !menuActive ? style.hidden : ""
        }`}
      >
        <h2 className={style.heading}>Filter</h2>
        <p className={style.price}>Price Upto: &#8377;{priceRange}</p>
        <input
          type="range"
          className={style.slider}
          min="0"
          max="80000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <h2 className={style.heading}>Category</h2>

        <div className={style.checkbox}>
          <input
            type="checkbox"
            value="men's clothing"
            onChange={(e) => handleCategoryChange(e)}
          />
          <label>Men's Clothing</label>
        </div>
        <div className={style.checkbox}>
          <input
            type="checkbox"
            value="women's clothing"
            onChange={(e) => handleCategoryChange(e)}
          />
          <label>Women's Clothing</label>
        </div>
        <div className={style.checkbox}>
          <input
            type="checkbox"
            value="jewelery"
            onChange={(e) => handleCategoryChange(e)}
          />
          <label>Jwellery</label>
        </div>
        <div className={style.checkbox}>
          <input
            type="checkbox"
            value="electronics"
            onChange={(e) => handleCategoryChange(e)}
          />
          <label>Electronics</label>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default SideBar;
