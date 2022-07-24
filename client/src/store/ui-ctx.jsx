import { createContext, useState } from "react";

export const uiCtx = createContext({
  showModal: false,
  setShowModal: () => {},
  setIsError: () => {},
  isError: false,
  errorMsg: "",
  setErrorMsg: () => {},
  onSetError: (msg) => {},
  isLoading: false,
  setIsLoading: () => {},
});

const UiProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSetError = (msg) => {
    setIsError((prev) => !prev);
    setErrorMsg(msg);
  };

  return (
    <uiCtx.Provider
      value={{
        showModal,
        setShowModal,
        isError,
        setIsError,
        errorMsg,
        setErrorMsg,
        onSetError,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </uiCtx.Provider>
  );
};

export default UiProvider;
