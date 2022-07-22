import classes from "./Header.module.css";
import { useContext } from "react";
import { authCtx } from "../../store/auth-ctx";
import { uiCtx } from "../../store/ui-ctx";
import { userCtx } from "../../store/user-ctx";

const Header = () => {
  const authCtxMgr = useContext(authCtx);
  const uiCtxMgr = useContext(uiCtx);
  const userCtxMgr = useContext(userCtx);

  const logoutHandler = () => {
    authCtxMgr.setIsLoggedIn(false);
    // CLEAR USER
    userCtxMgr.setList([]);
    userCtxMgr.setUser("");
    console.log(userCtxMgr.user);
  };

  const showRefHandler = () => {
    uiCtxMgr.setShowModal(true);
  };

  return (
    <header
      className={authCtxMgr.isLoggedIn ? classes.headerIn : classes.headerOut}
    >
      <h1 className={classes.h1}>CHINGU CHANGE</h1>
      <nav className={classes.nav}>
        {authCtxMgr.isLoggedIn && (
          <p className={classes.logout} onClick={showRefHandler}>
            Reference
          </p>
        )}
        {authCtxMgr.isLoggedIn && (
          <p className={classes.logout} onClick={logoutHandler}>
            Logout
          </p>
        )}
      </nav>
    </header>
  );
};
export default Header;
