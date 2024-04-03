import React from 'react'
import {  useSelector } from 'react-redux'
import {Button, TextInput} from "flowbite-react"

export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-2xl uppercase'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt='' className='rounded-full w-full h-full object-cover border-8 border-gray-400'></img>
        </div>
        <TextInput type='text' id='name' placeholder='name' defaultValue={currentUser.name}></TextInput>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}></TextInput>
        <Button type='submit' gradientDuoTone="purpleToBlue">Update</Button>
      </form>
      <div className='flex justify-between mt-4 mb-6' >
        <span className='uppercase text-red-600 font-bold text-xs'>Delete Account</span>
        <span className='uppercase text-red-600 font-bold text-xs'>Sign Out</span>
      </div>
    </div>
  )
}
