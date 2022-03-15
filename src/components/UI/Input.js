import React from "react";
import classes from "./Input.module.css";

//this input.js is a good example of how to enable custom components to use ref out of the box.

let Input;

export default Input = React.forwardRef((props, ref) => {
  return (
    <>
      <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} />{" "}
        {/** Make sure to include ref={ref} here!!! */}
        {/** ensures that objects like {type: "text"} is properly accepted */}
      </div>
    </>
  );
});
