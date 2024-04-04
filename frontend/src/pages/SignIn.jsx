import React from 'react'
import { Link } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";
import axios from "axios";
import { useDispatch , useSelector } from 'react-redux';
import { signInFailure, signInStart , signInSuccess } from '../redux/user/userSlice';


export default function SignIn() {
  const dispatcher = useDispatch();
  const {loading , error:errorMessage} = useSelector((state)=>state.user);
  const [showPassword, setShowPassword] = React.useState(false);

  let passwordInput = React.useRef("");
  let emailInput = React.useRef("");
  let nameInput = React.useRef("");
  const navigate  = useNavigate();
  
  function handleShowPassword() {
      (showPassword) ? setShowPassword(false) : setShowPassword(true);
  }

  async function handleSubmit(e)
  {
    e.preventDefault(); 
    try {
      dispatcher(signInStart());
      const res = await axios.post("/api/auth/sign-in" , {
         email : emailInput.current.value ,
          password : passwordInput.current.value
    }).catch((err)=> dispatcher(signInFailure(err.response.data.message)))
  
      const data = await res.data;
      dispatcher(signInSuccess(data.userData));
      localStorage.setItem("loginStatus" , true);

      (data.userData.isAdmin) ? localStorage.setItem("isAdmin" , true) : null; 
      navigate("/")
    } catch (error) {
      dispatcher(signInFailure(error.response.data.message));
    }
  }
  return (
    <div className='min-h-fit my-20'>
      <div className='left flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
        {/* left side */}
        <div className='flex-1'>
          <Link to="/" className='flex items-end whitespace-nowrap text-sm sm:text-sm font-semibold dark:text-white'>
            <span className='px-4 pb-1 pr-1 py-2 bg-gradient-to-br from-purple-950 to-cyan-400 
                rounded-lg text-white mr-0 text-4xl'>Coder'S</span>
            <span className='uppercase text-4xl font-bold text-blue-950 dark:text-white'>pace</span>
          </Link>
          <p className='right text-sm mt-5'>
            Expore the world of Coders with us. #Learn Yourself with us.
            Sign In Now !!
            By Click On SignIn Button or With Google.
          </p>
        </div>
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Email' htmlFor='email'></Label>
              <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                name='email'
                ref={emailInput}
              />
            </div>
            <div>
              <Label value='Your Password' htmlFor='password'></Label>
              <div className='flex justify-between rounded-lg password'>
                <input
                  className='pwd-box rounded-tl-lg rounded-bl-lg dark:rounded-tl-lg dark:rounded-bl-lg dark:rounded-br-none dark:rounded-tr-none w-full text-sm dark:bg-gray-700 bg-gray-50 dark:text-white'
                  type={(!showPassword) ? "password" : "text"}
                  placeholder='Enter Your Password'
                  id='password'
                  name='password'
                  ref={passwordInput}

                />
                <Button className='enabled:hover:bg-gray-100 focus:ring-0 bg-gray-50 dark:enabled:hover:bg-gray-700 dark:focus:ring-0 dark:bg-gray-700' onClick={handleShowPassword}>{(!showPassword) ? <IoEye className='text-black text-xl dark:text-white'></IoEye> : <IoEyeOff className='text-black dark:text-white text-xl'></IoEyeOff>}</Button>
              </div>
            </div>
            <Button gradientDuoTone="purpleToBlue" type='submit' onClick={handleSubmit} disabled={loading}>
              {
                loading ? <>
                  <Spinner size='sm'></Spinner>
                  <span className='pl-3'>Loading...</span>
                </> : 
                'Sign In'
              }
            </Button>
            <OAuth></OAuth>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account ?</span>
            <Link to="/sign-up" className='text-blue-950 font-bold  dark:text-gray-400'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color="failure">
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
