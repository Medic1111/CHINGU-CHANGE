import { createContext, useState } from "react";

export const uiCtx = createContext({
  showModal: false,
  setShowModal: () => {},
});

const UiProvider = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <uiCtx.Provider value={{ showModal, setShowModal }}>
      {props.children}
    </uiCtx.Provider>
  );
};

export default UiProvider;
