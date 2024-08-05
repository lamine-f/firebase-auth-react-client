import {Context, createContext, PropsWithChildren, useEffect, useState} from "react";
import { AUTH } from "../_configs/firebase.config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as logOut } from "firebase/auth"

interface userContextValue {
    signUp: (email: string, password: string) => any,
    signOut: () => any,
    signIn: (email: string, password: string) => any,
    currentUser: User | null
}
const userContext = createContext<userContextValue|null>(null);
interface User {
    email: string,
    password:string
}

export const UserContextProvider = ({children}: PropsWithChildren) => {
    const signUp = (email:string, password:string) => createUserWithEmailAndPassword(AUTH, email, password);
    const signIn = (email:string, password:string) => signInWithEmailAndPassword(AUTH, email, password);
    const signOut = () => logOut(AUTH);


    const [currentUser, setCurrentUser] = useState<User|null>(null)
    const [loadingData, setLoadingData] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(AUTH, (_currentUser: any) => {
            setCurrentUser(_currentUser);
            setLoadingData(false);
        });

        return unsubscribe;
    }, []);

    return <userContext.Provider value={{signUp, signIn, signOut, currentUser}} >
        {!loadingData && children}
    </userContext.Provider>
}

export const getUserContext = (): Context<userContextValue|null> => {
    if (userContext == null) throw new Error("Not context defined error")
    return userContext;
}