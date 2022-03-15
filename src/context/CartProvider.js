import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//state: current snapshot, action: element that is about to be updated
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // const updatedItems = state.items.concat(action.item); //like push but doesn't edit the existing array, it returns a new array
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

export default function CartProvider(props) {
  //first para: current State, second para: function that executes/dispatch/does smtg
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  ); //cartReducer-> insert the numerous state changes that you want, defaultCartState-> the default state
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCartHanlder = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHanlder,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
