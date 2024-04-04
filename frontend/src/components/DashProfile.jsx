import React, { useEffect, useRef, useState } from 'react'
import {  useSelector , useDispatch} from 'react-redux'
import { Link } from "react-router-dom"
import {Alert, Button, Modal, TextInput} from "flowbite-react"
import { getDownloadURL, getStorage , ref , uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase';
import axios from "axios";
import { BsExclamationCircle } from "react-icons/bs";
import { signInSuccess , deleteUserFailure , deleteUserSuccess , deleteUserStart , signOutFailure , signOutSuccess} from '../redux/user/userSlice';
import { useNavigate} from 'react-router';

export default function DashProfile() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user);
  const [imageFile , setImageFile] = useState(null);
  const [imageFileUrl , setImageFileUrl] = useState(null);
  const [imageFileUploadProgress , setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError , setImageFileUploadError] = useState(null)
  const [imageFileUploadLoading , setImageFileUploadLoading] = useState(false)

  const [showModel , setShowModel] = useState(false);
  const [updateSucess , setUpdateSuccess] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  console.log(imageFileUploadProgress , imageFileUploadError);
  const filePickRef = useRef();
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if(file)
    {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }


  const uploadImage = async ()=>{
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 && 
    //       request.resource.contentType.matches('image/.*')
          
    //     }
    //   }
    // }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef =  ref(storage , fileName);
    const uploadTask =  uploadBytesResumable(storageRef , imageFile);
     uploadTask.on(
      'state_changed' ,
      (snapshot) =>{ 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) + 100;
        setImageFileUploadProgress(progress.toFixed(0));
        setImageFileUploadLoading(true);
      },
      (error) => {
        setImageFileUploadError("Could not upload image file must be less than 2MB");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setImageFileUrl(downloadUrl)
          setImageFileUploadLoading(false);
          setImageFileUploadError(null);
        })
      }


    )

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(nameRef.current.value , emailRef.current.value , imageFileUrl );
    const res = await axios.put("/api/user/update" , {
      name : nameRef.current.value.trim(),
      email : emailRef.current.value.trim(),
      profilePicture : imageFileUrl
    }).catch(err => console.log(err));

    const data = await res.data;
    console.log(data);
    if(data.status)
    {
      setUpdateSuccess(true);
      dispatcher(signInSuccess(data.userData));
    }
    // console.log(updateSucess);
  }

  const handleUserDelete = async()=>{
    setShowModel(false);
    dispatcher(deleteUserStart);

    try {
      const res = await axios.delete("/api/user/delete").catch(err => dispatcher(deleteUserFailure(err.response.data.message)) );

      const data = await res.data;
  
      if(data.status)
      {
        dispatcher(deleteUserSuccess);    
        // localStorage.removeItem("loginStatus");
        // localStorage.removeItem("isAdmin");
        localStorage.clear();
        navigate("/");

      }

    } catch (error) {
      dispatcher(deleteUserFailure(error.response.data.message))
    }


    console.log(data);
  }

  const handleLogout = async()=>{
      try {
        const res = await axios.get("/api/user/logout").catch(err => dispatcher(err.response.data.message));

        const data = await res.data;

        if(data.status)
        {
          dispatcher(signOutSuccess);
          // localStorage.removeItem("loginStatus");
          localStorage.clear();
          navigate("/");
        }
      } catch (error) {
        dispatcher(signOutFailure(error.response.data.message))
      }
  }
  
  useEffect(()=>{
    if(imageFile)
    {
      uploadImage();
    }
  } ,[imageFile]);


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-2xl uppercase'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" hidden accept='image/*' onChange={handleProfileImage} ref={filePickRef}/>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=> filePickRef.current.click()}>
          <img src={imageFileUrl || currentUser.profilePhoto} alt='' className='rounded-full w-full h-full object-cover border-8 border-gray-400'></img>
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
        <TextInput type='text' id='name' placeholder='name' defaultValue={currentUser.name} ref={nameRef}></TextInput>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} ref={emailRef}></TextInput>
        {(imageFileUploadLoading) ?<Button type='submit' gradientDuoTone="purpleToBlue" disabled>Update</Button> : <Button type='submit' gradientDuoTone="purpleToBlue" onClick={handleSubmit}>Update</Button>}

        {
          currentUser.isAdmin && (
            <Link to="/create-post">
              <Button type='button' gradientDuoTone="purpleToBlue" className='w-full'>
              Create a post
            </Button>
            </Link>
          )
        }
     
     
      </form>
      {updateSucess && <Alert color="success" className='mt-4'>Update Successfully Done!!</Alert>}
      <div className='flex justify-between mt-4 mb-6' >
        <span className='uppercase text-red-600 font-bold text-xs cursor-pointer' onClick={()=>setShowModel(true)}>Delete Account</span>
        <span className='uppercase text-red-600 font-bold text-xs cursor-pointer' onClick={handleLogout}>Sign Out</span>
      </div>

      <Modal show={showModel} onClose={()=>setShowModel(false)} popup size="md">
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className='h-10 w-10 text-gray-400 dark:text-gray-200 mb-4 mx-auto' ></BsExclamationCircle>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
            <div className='flex justify-center gap-6'>
            <Button color="failure" onClick={handleUserDelete}>Yes , I'm sure</Button>          
            <Button className='bg-gray-700 ' onClick={()=>setShowModel(false)}>No, cancel</Button> 
            </div>         
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
