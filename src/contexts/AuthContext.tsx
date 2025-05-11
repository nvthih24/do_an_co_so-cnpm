import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on load
  useEffect(() => {
    // For demo purposes, check localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  // Login function
const login = async (email: string, password: string) => {
  setIsLoading(true);

  try {
    const res = await fetch('http://localhost:5000/api/login', {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();  // Lấy lỗi chi tiết trả về
      throw new Error(`Login failed: ${errorText}`);
    }

    const data = await res.json();  // Lấy dữ liệu trả về sau khi đăng nhập thành công

    const user: User = {
      id: data.user._id || 'N/A',
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    };

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', data.token); // Lưu token nếu cần thiết
  } catch (error) {
    console.error('Login failed:', error);
    throw error;  // Đảm bảo thông báo lỗi xuất hiện chính xác trong console
  } finally {
    setIsLoading(false);
  }
};

  
  // Register function
const register = async (data: RegisterData) => {
  setIsLoading(true);
  try {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Registration failed');
    }

    const newUser: User = await res.json();
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};