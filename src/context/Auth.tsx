import React, { createContext, useContext, useEffect, useState } from "react";
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
  const [user, setUser] = useState<AuthContextData["user"]>(null);
  const [session, setSession] = useState<AuthContextData["session"]>(null);

  const isloggedIn = !!user;

  const logout = () => {
    altogic.auth.signOut();
    setUser(null);
    setSession(null);
  };

  useEffect(() => {
    const session = altogic.auth.getSession();
    const user = altogic.auth.getUser();

    setUser(user ?? null);
    setSession(session ?? null);
  }, []);

  return <AuthContext.Provider value={{ user, setUser, session, setSession, logout, isloggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
