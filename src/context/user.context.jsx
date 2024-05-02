import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({ userId: 1 });

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(1);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
