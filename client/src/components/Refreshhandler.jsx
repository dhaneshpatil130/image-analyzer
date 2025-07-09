import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
 import { Navigate } from 'react-router-dom'


const Refreshhandler = ({setIsAuthenticated}) => {
    const location = useLocation()
    const Navigate = useNavigate()
    useEffect(()=>{
if(localStorage.getItem('token')){
    setIsAuthenticated(true)
    if(location.pathname =='/'|| location.pathname === '/login'|| location.pathname ==='/signup'){
        Navigate('/main',{replace:false})
    }
}
    },[location,Navigate,setIsAuthenticated])
  return (
    null
  )
}

export default Refreshhandler
