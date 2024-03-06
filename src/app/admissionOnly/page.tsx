"use client"
import './admissionOnly.css'
//import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/navigation'

export default function admissionOnly() {

    const router = useRouter();

    const logOut = () => {
      router.replace('/');
      localStorage.clear();
    };

    return (
  
      <div className='body'>
        <div className='topBar'>
        </div>
        <div className='centralElements'>
            <p className='text'>Esta página está dedicada exclusivamente a tu proceso de admisión</p>
            <button className='logout' onClick={() => logOut()}>Salir</button>
        </div>
      </div>
      
    )
  }