import React, { createContext, useContext, useState } from "react";
import type { Session, User } from "altogic";
import altogic from "@/libs/altogic";

interface AuthContextData {
  user: User | null;
  session: Session | null;
  setUser: (value: any) => void;
  setSession: (value: any) => void;
  logout: () => void;
  isloggedIn: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextData["user"]>(altogic.auth.getUser() as User);
  const [session, setSession] = useState<AuthContextData["session"]>(altogic.auth.getSession());

  const isloggedIn = !!user;

  const logout = () => {
    altogic.auth.signOut();
    altogic.auth.clearLocalData();
    setUser(null);
    setSession(null);
  };

  return <AuthContext.Provider value={{ user, setUser, session, setSession, logout, isloggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
