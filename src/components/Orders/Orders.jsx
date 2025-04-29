import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Spinner from "react-spinner-material";

import style from "./Orders.module.css";
import { useAuth } from "../../context/authContext";
import { db } from "../../config/firebaseInit";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "orders"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(items);
    });

    return () => unsubscribe();
  }, [user]);

  if (orders.length === 0) {
    return (
      <div>
        <Spinner
          radius={50}
          color={"#efb11d"}
          stroke={2}
          visible={true}
          className="react-spinner"
        />
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.header}>
          <h1 className={style.heading}>My Orders</h1>
        </div>
        <hr style={{ width: "90vw" }} />
        {orders.map((order, index) => (
          <div className={style.orderContainer} key={index}>
            <div className={style.orderDescription}>
              <p>Placed On: {order.createdAt?.toDate().toLocaleString()}</p>
              <p>Total: &#8377; {order.total}</p>
            </div>
            {order.items.map((item, i) => (
              <div className={style.orderItem} key={i}>
                <div className={style.imageContainer}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={style.itemImage}
                  />
                </div>
                <div className={style.itemDetails}>
                  <div className={style.itemTitle}>{item.title}</div>
                  <div className={style.itemDescription}>
                    {item.description}
                  </div>
                </div>
                <div className={style.itemPrice}>
                  <h2>&#8377; {item.price}</h2>
                </div>
                <p className={style.itemQuantity}>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
