import React from 'react'
import {Link} from "react-router-dom"
import {Button, Label, TextInput} from "flowbite-react";
export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='left flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
        {/* left side */}
          <div className='flex-1'>
            <Link to="/" className='flex items-end whitespace-nowrap text-sm sm:text-sm font-semibold dark:text-white'>
                <span className='px-4 pb-1 pr-1 py-2 bg-gradient-to-br from-purple-950 to-cyan-400 
                rounded-lg text-white mr-0 text-4xl'>Coder'S</span>
                <span className='uppercase text-4xl font-bold text-blue-950'>pace</span>
            </Link>
            <p  className='right text-sm mt-5'>
              Expore the world of Coders with us. #Learn Yourself with us.
              Register or Sign Up Now !! 
              By Click On SignUp Button or With Google.
            </p>
          </div>
          {/* right side */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4'>
              <div>
                <Label value='Your Name' htmlFor='_name'></Label>
                <TextInput
                  type='text'
                  placeholder='Enter Your Name'
                  id='_name'
                  name='_name'
                />
              </div>
              <div>
                <Label value='Your Email' htmlFor='email'></Label>
                <TextInput
                  type='text'
                  placeholder='name@gmail.com'
                  id='email'
                  name='email'
                />
              </div>
              <div>
                <Label value='Your Password' htmlFor='password'></Label>
                <TextInput
                  type='text'
                  placeholder='Enter Your Password'
                  id='password'
                  name='password'
                />
              </div>
              <Button gradientDuoTone="purpleToBlue" type='submit'>Sign Up</Button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account ?</span>
              <Link to="sign-in" className='text-blue-950 font-bold'>
                Sign In 
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}
