import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export const useAuth = () => {
  const authContextData = useContext(AuthContext);
  if (!authContextData) {
    return "Not a valid context";
  }
  console.log(authContextData);
  return {
    user: authContextData?.user,
  };
};
