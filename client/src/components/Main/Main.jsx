import FormConvert from "../FormConvert/FormConvert";
import List from "../List/List";
import classes from "./Main.module.css";
import Reference from "../Reference/Reference";
import { useContext } from "react";
import { uiCtx } from "../../store/ui-ctx";
import { userCtx } from "../../store/user-ctx";

const Main = () => {
  const uiCtxMgr = useContext(uiCtx);
  const userCtxMgr = useContext(userCtx);
  console.log(userCtxMgr.user);

  return (
    <main className={classes.main}>
      <FormConvert />
      <List />
      {uiCtxMgr.showModal && <Reference />}
    </main>
  );
};

export default Main;
