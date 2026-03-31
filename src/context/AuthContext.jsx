import { createContext, useContext, useState, useEffect } from 'react';
const password="user123"
const DEFAULT_USERS = [
  {
    id: 'client-1',
    name: 'Krishna Sanjay',
    email: 'krishnasanjayjeyakumar@gmail.com',
    password: 'sanjay123',
    role: 'client',
    phone: '+91 98765 43210',
    avatar: 'RS',
  },
  {
    id: 'owner-1',
    name: 'SasiTharan S',
    email: 'sasitharansivasamy@gmail.com',
    password: 'sasi123',
    role: 'owner',
    avatar: 'PV',
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('upvc_users_db');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('upvc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const register = (name, mobile, email, password, role) => {
    setLoading(true);
    setError('');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedMobile = mobile.trim();

        if (users.find(u => u.email?.toLowerCase() === normalizedEmail)) {
          setError('Email already exists.');
          setLoading(false);
          reject(new Error('Email exists'));
        } else {
          const newUser = {
            id: `${role}-${Date.now()}`,
            name: name.trim(),
            email: normalizedEmail,
            password,
            role,
            phone: normalizedMobile,
            avatar: name.trim().charAt(0).toUpperCase()
          };
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          localStorage.setItem('upvc_users_db', JSON.stringify(updatedUsers));

          const { password: _, ...safeUser } = newUser;
          setUser(safeUser);
          localStorage.setItem('upvc_user', JSON.stringify(safeUser));
          setLoading(false);
          resolve(safeUser);
        }
      }, 800);
    });
  };

  const login = (emailOrPhone, password) => {
    setLoading(true);
    setError('');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const identifier = emailOrPhone.trim().toLowerCase();
        const found = users.find(u =>
          (u.email?.toLowerCase() === identifier || u.phone === emailOrPhone.trim()) &&
          u.password === password
        );

        if (found) {
          const { password: _, ...safeUser } = found;
          setUser(safeUser);
          localStorage.setItem('upvc_user', JSON.stringify(safeUser));
          setLoading(false);
          resolve(safeUser);
        } else {
          setError('Invalid email or password. Please try again.');
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('upvc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
