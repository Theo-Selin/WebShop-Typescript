import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserInfo } from "../fetchUserInfo";

export const GlobalContext = createContext<GlobalContent>({
  userInfo: null,
});

interface Props {
  children?: React.ReactNode;
}

export const GlobalProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      return;
    }
    if (userInfo) {
      return;
    }
    fetchUserInfo();
  }, [fetchUserInfo, userInfo]);

  return (
    <GlobalContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};
