import React, { useState } from 'react';
import Login from './components/Login'
import Signup from './components/Signup'
import Mainn from './components/Mainn'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import bgVideo from './assets/bg-video.mp4';
import {Route,Routes} from 'react-router-dom' ; 
import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';
import Refreshhandler from './components/Refreshhandler';



const App = () => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
const PrivateRoute = ({element})=>{
return isAuthenticated ? element : <Navigate to ='/login'/>
}
    return (

        <div>
            <div className="relative z-10">
            <Refreshhandler setIsAuthenticated={setIsAuthenticated}/>
               <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path='/main' element={<PrivateRoute element={<Mainn/>}/>}/>
                </Routes>
            </div>
        </div>
    );
};


export default App;
