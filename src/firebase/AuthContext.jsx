import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // استعادة حالة المستخدم من localStorage عند التحميل
  useEffect(() => {
    const savedUser = localStorage.getItem('firebaseUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        // حفظ في localStorage
        localStorage.setItem('firebaseUser', JSON.stringify(userData));
        setCurrentUser(userData);
      } else {
        localStorage.removeItem('firebaseUser');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('firebaseUser');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};