import { Button } from 'flowbite-react'
import {AiFillGoogleCircle} from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup , getAuth} from "firebase/auth";
import {app} from "../firebase";
import React from 'react'
import axios from 'axios';
import { signInFailure , signInStart , signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function OAuth() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const auth = getAuth(app);
  const handleGoogleClick = async()=>{

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt : "select_account"});
    try {
      const resultPromGoogle = await signInWithPopup(auth , provider);
      // console.log(resultPromGoogle);
      const res = await axios.post("/api/auth/google" , {
        name : resultPromGoogle.user.displayName,
        email : resultPromGoogle.user.email,
        googlePhotoUrl : resultPromGoogle.user.photoURL
      }).catch(err =>  dispatcher(signInFailure(err.response.data.message)));

      const data = await res.data;
      console.log(data.userData);
      dispatcher(signInSuccess(data.userData));
      navigate("/");
    } catch (error) {
      dispatcher(signInFailure(err.response.data.message));
    }

  }
  return (
    <Button type='button' gradientDuoTone="pinkToOrange" onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-5 h-5 mr-1'></AiFillGoogleCircle>
      <span className='font-bold text-sm '>Continue With Google</span>
    </Button>
  )
}
