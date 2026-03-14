import { IUser } from "@/constants/UserTypes";
import { createContext, ReactNode, useState } from "react";

export const AuthContext = createContext<IUser | null>(null);

type TProp = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: TProp) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={(user, setUser)}>
      {children}
    </AuthContext.Provider>
  );
};
