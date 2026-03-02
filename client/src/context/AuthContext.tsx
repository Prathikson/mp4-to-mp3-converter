'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  plan: 'guest' | 'free' | 'pro' | 'unlimited';
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  plan: 'guest',
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<'guest' | 'free' | 'pro' | 'unlimited'>('guest');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPlan(data.plan || 'free');
        } else {
          setPlan('free');
        }
      } else {
        setPlan('guest');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, plan }}>
      {children}
    </AuthContext.Provider>
  );
};
