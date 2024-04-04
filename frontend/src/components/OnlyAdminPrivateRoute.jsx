import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router';
import { getUser } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function OnlyAdmin() {
  const dispatcher = useDispatch();

  useEffect(()=>{
      dispatcher(getUser());

  } , [])



  return (
     (localStorage.getItem("isAdmin"))? <Outlet/> : <Navigate to={"/sign-in"}></Navigate>
  )
}
