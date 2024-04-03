import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/user/testSlice';

export default function Projects() {
  const dispatcher = useDispatch();
  useEffect(()=>{
      dispatcher(getUser());
  } , [])
  return (
    
    <div>Projects</div>
  )
}
