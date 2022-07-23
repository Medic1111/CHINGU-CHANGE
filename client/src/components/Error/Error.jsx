import classes from "./Error.module.css";
import Portal from "../Portal/Portal";
import { uiCtx } from "../../store/ui-ctx";
import { useContext } from "react";

const Error = () => {
  const uiCtxMgr = useContext(uiCtx);

  const closeErrorHandler = () => {
    uiCtxMgr.onSetError("");
  };

  return (
    <Portal>
      <article className={classes.article}>
        <h3 className={classes.h3}>{uiCtxMgr.errorMsg}</h3>
        <button onClick={closeErrorHandler} className={classes.btn}>
          Close
        </button>
      </article>
    </Portal>
  );
};

export default Error;
