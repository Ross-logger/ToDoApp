import React, {createContext, useEffect, useState} from 'react';
import {FIREBASE_AUTH} from './FirebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};
