import FormConvert from "../FormConvert/FormConvert";
import List from "../List/List";
import classes from "./Main.module.css";
import Reference from "../Reference/Reference";
import { useContext } from "react";
import { uiCtx } from "../../store/ui-ctx";

const Main = () => {
  const uiCtxMgr = useContext(uiCtx);

  return (
    <main className={classes.main}>
      <FormConvert />
      <List />
      {uiCtxMgr.showModal && <Reference />}
    </main>
  );
};

export default Main;
