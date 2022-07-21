import { createContext, useState } from "react";

export const authCtx = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  showLogin: false,
  setShowLogin: () => {},
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <authCtx.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        showLogin,
        setShowLogin,
      }}
    >
      {props.children}
    </authCtx.Provider>
  );
};

export default AuthProvider;
