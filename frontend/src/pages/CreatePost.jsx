import React, { useState } from 'react'
import {TextInput , Select, FileInput, Button, Alert} from "flowbite-react"
import {getDownloadURL, getStorage , ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [file , setFile] = useState(null);
  const [uploadProgress , setuploadProgress] = useState(null);
  const [uploadError , setuploadError] = useState(null);
  const [formData , setFormData] = useState({});

  const handleUploadImage = async() => {
    try {
      if(!file){
        setuploadError("Please select an image");
      };
      setuploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage , fileName);
      const uploadTask = uploadBytesResumable(storageRef , file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setuploadProgress(progress.toFixed(0));

        },
        (error)=>{
          setuploadError("Something Went Wrong");
          setuploadProgress(null);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setuploadError(null);
            setuploadProgress(null);
            setFormData({...formData , image : downloadUrl});
          });

        }
      )

    } catch (error) {
      setuploadError("Image upload failed");
      setuploadProgress(null);
      console.log(error);
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'></h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'></TextInput>
          <Select>
            <option value="uncategorized">Select Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React js</option>
            <option value="nextjs">Next js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
          
          {(uploadProgress) ? <Button type='button' gradientDuoTone="purpleToBlue" size="sm" outline disabled>Loading...</Button> : <Button type='button' gradientDuoTone="purpleToBlue" size="sm" outline onClick={handleUploadImage}>Upload Image</Button>}
        </div>
        {(uploadError) && <Alert color="failure">{uploadError}</Alert>}

        {
          (formData.image) && <img src={formData.image} alt='image..' className='w-full h-72 object-cover'></img>
        }
        <ReactQuill theme='snow' placeholder='Write Post' className='h-72 mb-12' required/>
        <Button type='submit' gradientDuoTone="purpleToBlue">Publish</Button>
      </form>
    </div>
  )
}
