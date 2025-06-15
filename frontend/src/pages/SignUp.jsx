
import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios";

function SignUp() {
    const [showPassword,setShowPassword]=useState(false)
    const {serverUrl,userData,setUserData}=useContext(userDataContext)
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[loading,setloading]=useState(false)
    const[password,setPassword]=useState("")
    const[err,setErr]=useState("")
    const handleSignUp=async (e)=>{
        e.preventDefault()
        setErr("")
        setloading(true)
        try {
            let result=await axios.post(`${serverUrl}/api/auth/signup`,{
                name, email, password
            },{withCredentials:true})
              setUserData(result.data)
              setloading(false)
                navigate("/customize")
              
              
            
        } catch (error) {
            console.error("Signup failed:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setUserData(null)
            setloading(false)
            setErr(error.response?.data?.message || "Network Error")
            
            
        }
    }

    return(
        <div className='w-full h-[100vh] flex justify-center items-center' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
         <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>
            <h1 className='text-white text-[30px] font-semibold md-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>

            <input type="text" placeholder='Enter your name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setName(e.target.value)} value={name}/>
            
            <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px]  rounded-full text-[18px]'required onChange={(e)=>setEmail(e.target.value)} value={email} />

            <div className='w-full h-[60px] border-2 border-white bg-transparent  text-white rounded-full text-[18px] relative'>
                <input type={showPassword?"text":"password"} placeholder="password" className='w-full h-full rounded-full outline-none bg-transparent  placeholder-gray-300 px-[20px] py-[10px] 'required onChange={(e)=>setPassword(e.target.value)} value={password} />
              {!showPassword &&  <FaEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer ' onClick={()=>setShowPassword(true)}/>}
                {showPassword &&  <FaEyeSlash className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer ' onClick={()=>setShowPassword(false)}/>}
            </div>
            {err.length>0 && <p className='text-red-500 text-[17px]'>
                *{err}
                </p>}
            <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]' disabled={loading}>{loading?"loading....":"signup"}</button>

            <p className='text-white text-[19px] cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account? <span className='text-blue-400 '>Sign In</span></p>
            </form>   
            
        </div>
    )

}
export default SignUp
