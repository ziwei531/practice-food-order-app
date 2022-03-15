import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useState, useContext, useRef } from "react";
import CartContext from "../../../context/cart-context";

export default function MealItemForm(props) {
  const cartCtx = useContext(CartContext);
  const amountInput = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    const enteredAmount = amountInput.current.value;
    const enteredAmountNum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNum);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          ref={amountInput}
          label="Amount"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: 1,
            max: 5,
            step: 1,
            defaultValue: 1,
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount 1-5</p>}
      </form>
    </>
  );
}
