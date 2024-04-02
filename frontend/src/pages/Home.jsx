import React, { useEffect } from 'react'
// import axios from 'axios';
// axios.defaults.withCredentials = true;
// let firstRender = true;

export default function Home() {

  // const refreshToken = async()=>{
  //   const res = await axios.get("http://localhost:4000/api/auth/refresh" , {
  //     withCredentials : true
  //   }).catch(err => console.log(err));

  //   const data = await res.data;
  //     console.log(data); 
  //   return data;
  // }

  // const sendRequest = async()=>{
  //   try {
  //     const res = await axios.get("http://localhost:4000/api/auth/user" , {
  //       withCredentials : true
  //     }).catch(err => console.log(err));

  //     const data = await res.data;
  //     console.log(data);
  //     return data;

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(()=>{
  //   if(firstRender)
  //   {
  //     firstRender = false
  //     sendRequest().then((data) => console.log(data));
  //   }

  //   let interval = setInterval(()=>{
  //     refreshToken().then((data) => console.log(data));
  //   } ,24 * 60 * 60 * 1000);

  //   return ()=>clearInterval(interval);
  // } , []);


  return (
    <div>Home</div>
  )
}
