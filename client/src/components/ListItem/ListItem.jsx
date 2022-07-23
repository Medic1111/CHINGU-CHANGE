import classes from "./ListItem.module.css";
import { userCtx } from "../../store/user-ctx";
import { useContext } from "react";
import axios from "axios";

const ListItem = ({ obj }) => {
  const userCtxMgr = useContext(userCtx);

  const deleteHandler = () => {
    const data = {
      original: obj.original,
      convertTo: obj.convertTo,
      id: userCtxMgr.user,
    };

    axios
      .put("/api/deleteCurrency", data)
      .then((serverRes) => {
        userCtxMgr.setList(() => {
          return userCtxMgr.list.filter((objRet) => {
            return objRet !== obj;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li className={classes.li}>
      <span>
        {obj.original} → {obj.convertTo}
      </span>
      <span onClick={deleteHandler} className={classes.x}>
        x
      </span>
    </li>
  );
};

export default ListItem;
