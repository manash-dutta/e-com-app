import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

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

  console.log(cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.header}>
          <h1 className={style.heading}>Shopping Cart</h1>
          <h2 className={style.total}>
            Subtotal ({cart.length} items): Rs {total}
          </h2>
          <button className={style.buyBtn}>Proceed to Buy</button>
        </div>
        <hr style={{ width: "90vw" }} />

        {cart.map((item) => (
          <div className={style.cartItem}>
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
            <div className={style.itemPrice}>
              <h2>{item.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
