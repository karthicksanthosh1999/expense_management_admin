"use client";

import { IUser } from "@/constants/UserTypes";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "react-day-picker";

type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<
    React.SetStateAction<IUser | null>
  >;
  loading: boolean;
};

export const AuthContext =
  createContext<AuthContextType | null>(null);

type TProp = {
  children: ReactNode;
};

export const AuthUserProvider = ({
  children,
}: TProp) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { replace } = useRouter()
  
  useEffect(() => {
    let mounted = true;
    const decodeUser = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          "/api/auth/decode"
        );
        if (!mounted) return;
        if(!data?.user?.user){
          replace("/login")
        }
        setUser(data?.user?.user);
      } catch (error) {
        console.error("Decode error:", error);
        if (!mounted) return;
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    decodeUser();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};