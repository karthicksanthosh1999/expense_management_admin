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
      const { data } = await api.get("/api/auth/decode");
      console.log(data);
      setUser(data?.user?.user);
    } catch (error) {
      console.log("Decode error:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
