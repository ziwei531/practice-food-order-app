import classes from "./Card.module.css";

export default function Card(props) {
  const allClasses = classes.card + " " + props.classes;
  return (
    <div className={allClasses}>{props.children}</div>
  );
}
