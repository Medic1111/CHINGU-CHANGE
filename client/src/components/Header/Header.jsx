import classes from "./Header.module.css";
import { useContext } from "react";
import { authCtx } from "../../store/auth-ctx";

const Header = () => {
  const authCtxMgr = useContext(authCtx);

  const logoutHandler = () => {
    authCtxMgr.setIsLoggedIn(false);
    // CLEAR USER
  };

  return (
    <header
      className={authCtxMgr.isLoggedIn ? classes.headerIn : classes.headerOut}
    >
      <h1 className={classes.h1}>CHINGU CHANGE</h1>
      {authCtxMgr.isLoggedIn && (
        <p className={classes.logout} onClick={logoutHandler}>
          Logout
        </p>
      )}
    </header>
  );
};
export default Header;
