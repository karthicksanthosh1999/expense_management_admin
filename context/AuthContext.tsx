"use client";
import { IUser } from "@/constants/UserTypes";
import api from "@/lib/api";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type TProp = {
  children: ReactNode;
};
export const AuthUserProvider = ({ children }: TProp) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    decodeUser();
  }, []);

  const decodeUser = async () => {
    try {
      const res = await api.get("/api/auth/decode");
      setUser(res.data);
    } catch (error) {
      console.log("Decode error:", error);
    }
  };
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
