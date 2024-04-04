import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';
import { getUser } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'



export default function PrivateRoute({userInfo}) {
  const dispatcher = useDispatch();
  const {currentUser} = useSelector(state=>state.user);
  const [currUser , setCurrUser] = useState(false);
  useEffect(()=>{
      dispatcher(getUser());
  } , [dispatcher])


  useEffect(()=>{
    setCurrUser(currentUser);
  
  } , [currentUser])


  return (
     (localStorage.getItem("loginStatus")) ? <Outlet/> : <Navigate to={"/sign-in"}></Navigate>
  )
}
