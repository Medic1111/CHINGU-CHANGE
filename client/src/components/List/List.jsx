import classes from "./List.module.css";
import currencyList from "../../data/currencyList";

const List = () => {
  return (
    <aside className={classes.aside}>
      <h2 className={classes.h2}>FAVORITES</h2>
      <ul className={classes.ul}>
        <li className={classes.li}>USD → PHP</li>
        {/* TURN LIST INTO COMPONENT */}
      </ul>
    </aside>
  );
};

export default List;
