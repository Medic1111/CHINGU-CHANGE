import React, { useContext } from "react";
import Auth from "./components/Auth/Auth";
import { authCtx } from "./store/auth-ctx";
import { uiCtx } from "./store/ui-ctx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const authCtxMgr = useContext(authCtx);
  const uiCtxMgr = useContext(uiCtx);

  return (
    <React.Fragment>
      <Header />
      {uiCtxMgr.isLoading && <Spinner />}
      {authCtxMgr.isLoggedIn ? <Main /> : <Auth />}
      <Footer />
    </React.Fragment>
  );
}

export default App;
