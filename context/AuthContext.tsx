"use client";
import { IDecodeUser } from "@/constants/UserTypes";
import api from "@/lib/api";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  user: IDecodeUser | null;
  setUser: React.Dispatch<React.SetStateAction<IDecodeUser | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type TProp = {
  children: ReactNode;
};
export const AuthUserProvider = ({ children }: TProp) => {
  const [user, setUser] = useState<IDecodeUser | null>(null);

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
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
