// types/index.ts
export interface User {
    uid: string;
    email: string;
    fname?: string;
    lname?: string;
    phone?: string;
    country?: string;
    city?: string;
    state?: string;
    createdAt?: Date;
    lastLogin?: Date;
  }
  
  export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
  }
  
  export interface AppError {
    code: string;
    message: string;
  }