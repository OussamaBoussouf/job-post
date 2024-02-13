import { createContext, useContext} from "react";


const AuthContext = createContext(
  JSON.parse(localStorage.getItem("user")) || null
);


export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};
