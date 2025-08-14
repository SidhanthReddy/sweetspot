// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { observeUser } from '../Services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeUser((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); 

  return { user, loading };
};