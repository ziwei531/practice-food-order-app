import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../context/cart-context";

export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const [btnBump, setBtnBump] = useState(false);
  const numOfCartItems = items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnBump(true);

    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  console.log(btnBump);

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ""}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
}
