"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initFirebase } from '../app/firebase';

const AuthContext = createContext<{ user: User | null; loading: boolean}> ({
    user: null,
    loading: true,
});

export function AuthProvider({ children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User| null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const app =initFirebase();
        const auth = getAuth(app);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);