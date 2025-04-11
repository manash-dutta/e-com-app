import React from "react";

import style from "./ProductsList.module.css";
import { useProducts } from "../../context/productContext";

const ProductsList = () => {
  const { productData, searchedProduct, setSearchedProduct } = useProducts();

  const productsToRender =
    searchedProduct && searchedProduct.length > 0
      ? searchedProduct
      : productData;
  console.log(productsToRender);
  if (!productData || productData.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className={style.gridWrapper}>
      {productsToRender.map((product) => (
        // <div className={style.gridWrapper}>
        <div className={style.container}>
          <div className={style.imageContainer}>
            <img src={product.image} alt="" className={style.productImage} />
          </div>
          <div className={style.productInfoContainer}>
            <div className={style.productInfo}>
              <h2 className={style.productName}>{product.title}</h2>
              <h3 className={style.productPrice}>
                &#8377; {Math.floor(product.price * 85)}
              </h3>
            </div>
            <div className={style.button}>
              <button className={style.addRemoveBtn}>Add to Cart</button>
            </div>
          </div>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default ProductsList;
