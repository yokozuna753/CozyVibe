import { createContext, useState } from "react";

const FunctionContext = createContext();

function FunctionProvider({children}) {
  const [formType, setFormType] = useState("Create a New Spot");

  function changeContext(newType) {
    setFormType(newType);
  }

  return (
    <FunctionContext.Provider value={{ formType, changeContext }}>
      {children}
    </FunctionContext.Provider>
  );
}

export {FunctionContext, FunctionProvider}
