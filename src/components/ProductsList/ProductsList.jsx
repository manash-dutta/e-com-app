import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { db } from "../../config/firebaseInit";
import style from "./ProductsList.module.css";
import { useProducts } from "../../context/productContext";
import { useAuth } from "../../context/authContext";

const ProductsList = () => {
  const { productData, searchedProduct } = useProducts();
  const { user } = useAuth();

  const productsToRender =
    searchedProduct && searchedProduct.length > 0
      ? searchedProduct
      : productData;

  const handleCart = async (product) => {
    if (!user) {
      toast.info("Please login to Add item to Cart");
      return;
    }

    try {
      const cartItemRef = doc(db, "carts", user.uid + "_" + product.id);
      await setDoc(cartItemRef, {
        userId: user.uid,
        productId: product.id,
        title: product.title,
        description: product.description,
        price: Math.floor(product.price * 85),
        image: product.image,
        quantity: 1,
      });
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error(error);
    }
  };

  if (!productData || productData.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div className={style.gridWrapper}>
        {productsToRender.map((product) => (
          <div key={product.id} className={style.container}>
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
                <button
                  className={style.addRemoveBtn}
                  onClick={async () => await handleCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default ProductsList;
