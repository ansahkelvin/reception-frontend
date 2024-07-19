"use client"
import {createContext, useContext, useEffect, useState} from 'react';
import {getToken, removeToken} from '@/utils/auth';
import {useRouter} from "next/navigation";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {

        const fetchUserDetails = async (token) => {
            try {
                console.log(authToken, "Auth token")
                const response = await axios.get('http://localhost:4000/api/v1/user/info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    setUser(response.data)
                } else {
                    router.push('/auth/sign-in')
                }
            } catch (e) {
                console.log(e)
                router.push('/auth/sign-in')

            }
        }

        const token = getToken();
        console.log(token)
        if (token) {
            setAuthToken(token);
            fetchUserDetails(token)
        } else {
            router.push('/auth/sign-in')
        }
    }, []);




    const logout = () => {
        removeToken();
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider
            value={{authToken, logout, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
