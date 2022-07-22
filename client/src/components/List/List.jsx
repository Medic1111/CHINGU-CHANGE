import classes from "./List.module.css";
import { useContext } from "react";
import { userCtx } from "../../store/user-ctx";

const List = () => {
  const userCtxMgr = useContext(userCtx);

  return (
    <aside className={classes.aside}>
      <h2 className={classes.h2}>FAVORITES</h2>
      <ul className={classes.ul}>
        {userCtxMgr.list.map((obj, index) => {
          return (
            <li key={`FAV_${index}`} className={classes.li}>
              {obj.original} → {obj.convertTo}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default List;
