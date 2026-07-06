import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type RegisterData = {
  role: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  acceptedPolicy: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  registerData: RegisterData;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>;

  login: () => Promise<void>;
  logout: () => void;
  register: () => Promise<void>;
};

const initialRegisterData: RegisterData = {
  role: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  location: "",
  acceptedPolicy: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [registerData, setRegisterData] =
    useState<RegisterData>(initialRegisterData);

  const login = async () => {
    // API Call
  };

  const register = async () => {
    // API Call
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRegisterData(initialRegisterData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,

        registerData,

        setUser,
        setToken,
        setRegisterData,

        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
