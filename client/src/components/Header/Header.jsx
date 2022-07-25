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
    userCtxMgr.setUserInfo({ amount: 1, original: "USD", convertTo: "CAD" });
    authCtxMgr.setIsLoggedIn(false);
    userCtxMgr.setList([]);
    userCtxMgr.setUser("");
  };

  const showRefHandler = () => uiCtxMgr.setShowModal(true);

  return (
    <header
      className={authCtxMgr.isLoggedIn ? classes.headerIn : classes.headerOut}
    >
      <h1 className={classes.h1}>CHINGU CHANGE</h1>
      <nav className={classes.nav}>
        {authCtxMgr.isLoggedIn && (
          <>
            <p className={classes.logout} onClick={showRefHandler}>
              Reference
            </p>
            <p className={classes.logout} onClick={logoutHandler}>
              Logout
            </p>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
