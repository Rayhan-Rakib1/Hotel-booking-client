
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import axios from 'axios';


const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const SignInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (updated) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updated);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('state capture', currentUser?.email);
            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('https://hotel-booking-server-blond.vercel.app/jwt', user, {withCredentials: true})
                    .then(res => {
                        console.log('login',res.data)
                        setLoading(false)
                    })
            }

            else{
                axios.post('https://hotel-booking-server-blond.vercel.app/logout', {}, {
                    withCredentials: true
                })
                .then(res  => {
                    console.log('logout', res.data);
                    setLoading(false)
                })
            }

        })
        return () => {
            unSubscribe();
        };
    }, [])

    const authInfo = {
        loading, user, createUser, signInUser, signOutUser, SignInWithGoogle, updateUserProfile, resetPassword, setUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;