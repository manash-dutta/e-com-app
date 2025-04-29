import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  writeBatch,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer, Bounce } from "react-toastify";
import Spinner from "react-spinner-material";

import { db } from "../../config/firebaseInit";
import style from "./Cart.module.css";
import { useAuth } from "../../context/authContext";

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "carts"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCart(items);
    });

    return () => unsubscribe();
  }, [user]);

  const increaseQuantity = async (productId) => {
    const productRef = doc(db, "carts", productId);
    try {
      await updateDoc(productRef, {
        quantity:
          (cart.find((product) => product.id === productId)?.quantity || 1) + 1,
      });
      toast.success("Item quantity increased.");
    } catch (error) {
      console.error(error);
      toast.error("Sorry item out of stock");
    }
  };

  const decreaseQuantity = async (productId) => {
    const currentItem = cart.find((product) => product.id === productId);
    if (!currentItem) return;

    const productRef = doc(db, "carts", productId);

    try {
      if (currentItem.quantity > 1) {
        await updateDoc(productRef, {
          quantity: currentItem.quantity - 1,
        });
        toast.success("Item quantity decreased");
      } else {
        await deleteDoc(productRef);
        toast.success("Item removed from cart.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again later.");
    }
  };

  const removeFromCart = async (productId) => {
    const productRef = doc(db, "carts", productId);
    deleteDoc(productRef);
  };

  const handleBuy = async () => {
    if (!user) {
      toast.info("Please login to place an order");
      return;
    }

    if (cart.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    try {
      const orderItems = cart.map(({ id, ...rest }) => rest);
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: orderItems,
        total: total,
        createdAt: new Date(),
      });

      const batch = writeBatch(db);
      cart.forEach((item) => {
        const cartRef = doc(db, "carts", item.id);
        batch.delete(cartRef);
      });
      await batch.commit();

      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Order placement failed: ", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  console.log(cart);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.header}>
          <h1 className={style.heading}>Shopping Cart</h1>
          <h2 className={style.total}>
            Subtotal ({totalItems} items): Rs {total}
          </h2>
          <button className={style.buyBtn} onClick={handleBuy}>
            Buy now
          </button>
        </div>
        <hr style={{ width: "90vw" }} />

        {cart.map((item) => (
          <div className={style.cartItem} key={item.id}>
            <div className={style.imageContainer}>
              <img
                src={item.image}
                alt={item.title}
                className={style.itemImage}
              />
            </div>
            <div className={style.itemDetails}>
              <div className={style.itemTitle}>{item.title}</div>
              <div className={style.itemDescription}>{item.description}</div>
            </div>
            <div className={style.addRemoveContainer}>
              <div className={style.addRemoveItem}>
                <FontAwesomeIcon
                  icon={faMinus}
                  className={style.decrease}
                  onClick={() => decreaseQuantity(item.id)}
                />
                <div className={style.quantity}>{item.quantity}</div>
                <FontAwesomeIcon
                  icon={faPlus}
                  className={style.increase}
                  onClick={() => increaseQuantity(item.id)}
                />
              </div>
              <div
                className={style.delete}
                onClick={() => removeFromCart(item.id)}
              >
                Remove from cart
              </div>
            </div>
            <div className={style.itemPrice}>
              <h2>&#8377; {item.price}</h2>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default Cart;
