import React from "react";
import Head from "next/dist/shared/lib/head";
import { useEffect } from "react";
import {
  decrementItem,
  getCarts,
  incrementItem,
  removeItem,
} from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/CartPage.module.scss";
import Image from "next/dist/client/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Carts = () => {
  const dispatch = useDispatch();
  const allCartsData = useSelector((state) => state.Carts);
  const { cart } = allCartsData;

  // LOAD DATA
  useEffect(() => {
    dispatch(getCarts());
  }, []);

  // TOTAL PRICE
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  const getTotalProduct = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  return (
    <div>
      <Head>
        <title>Carts</title>
      </Head>

      {cart.length === 0 ? (
        <center>
          <h1 style={{ marginTop: "100px" }}>Your Cart is Empty!</h1>
        </center>
      ) : (
        <div className={styles.container}>
          <>
            <div className={styles.header}>
              <div>Image</div>
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total Price</div>
              <div>Actions</div>
            </div>
            {cart.map((item) => (
              <div className={styles.body}>
                <div className={styles.image}>
                  <Image src={item.image} height="90" width="65" />
                </div>
                <p>{item.title}</p>
                <p>$ {item.price}</p>
                <div className={styles.buttons}>
                  <button onClick={() => dispatch(incrementItem(item))}>
                    +
                  </button>
                  {item.quantity}
                  <button onClick={() => dispatch(decrementItem(item))}>
                    -
                  </button>
                </div>
                <p>$ {item.quantity * item.price}</p>
                <button
                  onClick={() => dispatch(removeItem(item))}
                  className="button-ud"
                >
                  <FontAwesomeIcon icon={faTrash} size="2x" />
                </button>
              </div>
            ))}
            <hr style={{ border: "solid 1px" }} />
            <div className="total-cart">
              <h2>Total Product: {getTotalProduct()}</h2>
              <h2>Grand Total: $ {getTotalPrice()}</h2>
              <button className="cart-checkout">Checkout</button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Carts;
