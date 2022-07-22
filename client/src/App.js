import "./App.css";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import Auth from "./components/Auth/Auth";
import { authCtx } from "./store/auth-ctx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Reference from "./components/Reference/Reference";

function App() {
  const authCtxMgr = useContext(authCtx);

  return (
    <React.Fragment>
      <Header />
      {authCtxMgr.isLoggedIn ? <Main /> : <Auth />}
      <Footer />
    </React.Fragment>
  );
}

export default App;
