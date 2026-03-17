import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export const useAuth = () => {
  const authContextData = useContext(AuthContext);

  if (!authContextData) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authContextData;
};
