import React, { useEffect } from 'react'
import { Navigate } from 'react-router';
import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
axios.defaults.withCredentials = true;
let firstRender = true;

export default function Home({user}) {

  const dispatcher = useDispatch();
  const refreshToken = async()=>{
    const res = await axios.get("/api/auth/refresh" , {
      withCredentials : true
    }).catch(err => console.log(err));

    const data = await res.data;
      console.log(data); 
    return data;
  }

  const sendRequest = async()=>{
    try {
      const res = await axios.get("/api/user" , {
        withCredentials : true
      }).catch(err => console.log(err));

      const data = await res.data;
      dispatcher(signInSuccess(data));
      user(data);
      return data;

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    console.log(firstRender);
    if(firstRender)
    {
      
      firstRender = false
      sendRequest();
    }

    let interval = setInterval(()=>{
      refreshToken().then((data) => console.log(data));
    } ,24 * 60 * 60 * 1000);

    return ()=>clearInterval(interval);
  } , []);


  return (
    <div>Home</div>
  )
}
