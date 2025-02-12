import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'https://hotel-booking-server-blond.vercel.app',
    withCredentials: true
})

const UseAxiosSecure = () => {
    const { signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('error caught in interceptor', error);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('need to logout the user');
                signOutUser()
                    .then(() => {
                        navigate('/signIn')
                        console.log('sign out user');
                    })
                    .catch(error => console.log(error.message))
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
};

export default UseAxiosSecure;