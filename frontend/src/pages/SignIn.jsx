import React from 'react'
import { Link } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage , setErrorMessage] = React.useState(null);
  const [loading , setLoading] = React.useState(null);
  let passwordInput = React.useRef("");
  let emailInput = React.useRef("");
  let nameInput = React.useRef("");
  const navigate  = useNavigate();
  let userObj = {
    email : "",
    password : ""
   }
  function handleShowPassword() {
      (showPassword) ? setShowPassword(false) : setShowPassword(true);
  }

  async function handleSubmit(e)
  {
    e.preventDefault();

    userObj = {...userObj , email : emailInput.current.value , password : passwordInput.current.value};
    
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/sign-in" , {
        method : "POST",
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify(userObj)
      });

      const data = await res.json();
      if(data.status === false)
      {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      
      setLoading(false);
      navigate("/");

    } catch (error) {
      setErrorMessage(error.message);
      setErrorMessage(false);
    }

    console.log(JSON.stringify(userObj));
  }
  return (
    <div className='min-h-fit my-20'>
      <div className='left flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
        {/* left side */}
        <div className='flex-1'>
          <Link to="/" className='flex items-end whitespace-nowrap text-sm sm:text-sm font-semibold dark:text-white'>
            <span className='px-4 pb-1 pr-1 py-2 bg-gradient-to-br from-purple-950 to-cyan-400 
                rounded-lg text-white mr-0 text-4xl'>Coder'S</span>
            <span className='uppercase text-4xl font-bold text-blue-950'>pace</span>
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
                  className='pwd-box rounded-tl-lg rounded-bl-lg w-full text-sm bg-gray-50'
                  type={(!showPassword) ? "password" : "text"}
                  placeholder='Enter Your Password'
                  id='password'
                  name='password'
                  ref={passwordInput}

                />
                <Button className='enabled:hover:bg-gray-100 focus:ring-0 bg-gray-50' onClick={handleShowPassword}>{(!showPassword) ? <IoEye className='text-black text-xl'></IoEye> : <IoEyeOff className='text-black text-xl'></IoEyeOff>}</Button>
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
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account ?</span>
            <Link to="/sign-up" className='text-blue-950 font-bold'>
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
