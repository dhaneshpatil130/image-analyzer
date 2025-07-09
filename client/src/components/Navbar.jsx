import React, { useEffect } from 'react'
import { GiBeastEye } from "react-icons/gi";
import { FaHandPaper } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
const [loading,setLoading] = useState(false)
  const [loggedinUser,setLoggedinUser] = useState(null)
  const navigate = useNavigate();


  useEffect(()=>{
setLoggedinUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout=(e)=>{
    console.log('logOut')
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser')
    setLoading(true)
    setTimeout(()=>{
navigate('/login')
    },3000)
  }

  return (
    <div  className='h-full w-full  flex items-center justify-between p-1 px-24 bg-blue-500  '>
      <div>
        <h2 className='font-Aclonica flex justify-center items-center gap-1 text-3xl text-white'><GiBeastEye/>i-Analyser</h2>
      </div>
    <ul className='flex items-center justify-center gap-7 text-xl font-bold'>

      
      <li className='font-Manrope font-bold'>Home</li>
      <li className='font-Manrope font-bold'>Contact</li>
      <li className='font-Manrope font-bold'>About</li>
      <li className='font-Manrope font-bold'>HowItWorks</li>
    </ul>
    <div>
      <h2  className='font-Manrope font-bold text-2xl' >Hi ,{loggedinUser}<button className='text-base px-4 py-2 bg-red-700 rounded-2xl text-white ml-3 hover:bg-red-900' onClick={handleLogout}>{loading==false?'Logout':'Logging Out..'}</button> </h2>
    </div>
    </div>
  )
}

export default Navbar
