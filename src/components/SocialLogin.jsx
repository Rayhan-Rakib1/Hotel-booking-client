import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    const {SignInWithGoogle} = useContext(AuthContext)

    const handleGoogleSignIn = () => {
        SignInWithGoogle()
        .then(res => {
            console.log(res.user);
        })
        .catch(err => {
            console.log(err.message);
        })
    }
    return (
        <div >
            <button onClick={handleGoogleSignIn} className='btn flex items-center justify-center w-full bg-gray-100 text-gray-700 hover:bg-gray-300 font-bold'><FaGoogle /> Login with Google</button>
        </div>
    );
};

export default SocialLogin;