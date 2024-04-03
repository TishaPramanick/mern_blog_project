import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';
import { getUser } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function PrivateRoute() {
  let show = false;
  const dispatcher = useDispatch();
  const user = useSelector(state => state.user);
  const [currUser , setCurrUser] = useState(user);


  useEffect(()=>{
      dispatcher(getUser());

  } , [dispatcher])

  useEffect(()=>{
    setCurrUser(user);
    console.log(user)
  } , [])

  return (
     (currUser) ? <Outlet/> : <Navigate to={"/sign-in"}></Navigate>
  )
}
