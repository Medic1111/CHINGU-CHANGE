import classes from "./Reference.module.css";
import currencyList from "../../data/currencyList";
import Portal from "../Portal/Portal";
import { useContext } from "react";
import { uiCtx } from "../../store/ui-ctx";

const Reference = () => {
  const uiCtxMgr = useContext(uiCtx);

  const closeReferenceHandler = () => {
    uiCtxMgr.setShowModal(false);
  };

  return (
    <Portal>
      <article className={classes.article}>
        <ul className={classes.ul}>
          {currencyList.map((obj, index) => {
            return (
              <li key={`REF_${index}`} className={classes.li}>
                <span>{Object.values(obj)[0]}</span>{" "}
                <span>{Object.keys(obj)[0]}</span>
              </li>
            );
          })}
        </ul>
        <button onClick={closeReferenceHandler} className={classes.submit}>
          Close
        </button>
      </article>
    </Portal>
  );
};

export default Reference;
