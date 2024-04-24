import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextPorvider = ({ children }) => {
  let user = localStorage.getItem("user");
  //console.log(user);
  const [currentUser, setCurrentUser] = useState(JSON.parse(user) || null);

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
