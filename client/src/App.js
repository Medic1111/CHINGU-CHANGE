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

  // let original = "USD";
  // let convertTo = "PHP";

  // const fetchApi = () => {
  //   axios
  //     .get(`/api/${original}&${convertTo}`)
  //     .then((serverRes) => console.log(serverRes.data))
  //     .catch((err) => console.log(err.response.status));
  // };

  // useEffect(fetchApi, []);

  return (
    <React.Fragment>
      <Header />
      {authCtxMgr.isLoggedIn ? <Main /> : <Auth />}
      <Footer />
      {/* <Reference /> */}
    </React.Fragment>
  );
}

export default App;
