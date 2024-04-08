import axios from 'axios';
import cryptoJs from 'crypto-js';
import { Alert, Button, Textarea, Modal} from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom"
import Comment from './Comment';
import { BsExclamationCircle } from "react-icons/bs";

export default function CommentSection({postId}) {
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const [comment , setComment] = useState('');
    const [comments , setComments] = useState([]);
    const [showModel , setShowModel] = useState(false);
    const [commentToDelete , setCommentToDelete] = useState(false);
    let selectedPostId;
    const [commentError , setCommentError] = useState(null);
    
    const decryptData = ()=>{
        if(postId)
        {
        const encrypt = postId;
        const decrypt = cryptoJs.AES.decrypt(encrypt , "postId").toString(cryptoJs.enc.Utf8);
        return JSON.parse(decrypt);
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(postId)
        {
        const encrypt = postId;
        const decrypt =  cryptoJs.AES.decrypt(encrypt , "postId").toString(cryptoJs.enc.Utf8);
         var pId =  JSON.parse(decrypt);
        }

        if(comment.length >  200)
        {
            return;
        }
        try {
            const res = await axios.post("/api/comment/create" , {
                content : comment ,
                postId : pId,
                userId : currentUser._id

            }).catch(err => {console.log(err);setCommentError(err.response.data.message)});

            const data = await res.data;
            setComment('');
            setCommentError(null);
            setComments([data , ...comments]);
        } catch (error) {
            console.log(error);
            setCommentError(error.message)
        }
    }

    const getComments = async()=>{
        try {
            const res = await axios.get(`/api/comment/getPostComments/${selectedPostId}`).catch(err => {console.log(err);setCommentError(err.response.data.message)});

            const data = await res.data;
            setComments(data);
            setCommentError(null);
        } catch (error) {
            console.log(error);
            setCommentError(error.message)
        }
    }

    const handleLikes = async(commentId)=>{
        if(!currentUser) { navigate('/sign-in');  return;}

        try {
            const res = await axios.put(`/api/comment/like/${commentId}`).catch(err => {console.log(err);setCommentError(err.response.data.message)});
            const data = res.data;

            setComments(comments.map((c)=>
                c._id === commentId ? {
                    ...c , 
                    likes : data.likes,
                    numberOfLikes : data.likes.length
                } : c
            ))
        } catch (error) {
            setCommentError(error.message);
        }
    }

    const handleEdit = (comment , editedContent)=>{

        setComments(comments.map((c)=>
                c._id === comment._id ? {
                    ...c , 
                    content : editedContent,
                } : c
            ));

    }
    
    const handleDelete = async(commentId)=>{
        setShowModel(false);
        try {
            if(!currentUser){
                navigate('/sign-in');
                return;
            }
            const res = await axios.delete(`/api/comment/delete/${commentId}`).catch(err => console.log(err));

            const data = res.data;
                    setComments(
                        comments.filter((comment) => comment._id !== commentId)
                    );
            
        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(()=>{

        selectedPostId = decryptData();
        console.log(selectedPostId);
       getComments();
    } , [selectedPostId]);


  return (
    <div>
        {currentUser ? 
        (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed-In As : </p>
                <img src={currentUser.profilePhoto} alt='user' className='h-5 w-5 object-cover rounded-full'/>
                <Link to="/dashboard?tab=profile" className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.name}
                </Link>
            </div>
        ) : 
        (
            <div className=''>
                You must be signed in to CommentSection
                <Link to={'/sign-in'} className='text-cyan-950 font-bold'>
                    Sign In
                </Link>
            </div>
        )
        }

        {
            currentUser && (
                <>
                <form className='border border-teal-500 rounded-md p-3'>
                    <Textarea placeholder='Add a comment...' rows="3" maxLength='200' onChange={(e) => setComment(e.target.value)}/>
                    <div className='flex justify-between items-center mt-4'>
                        <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone="purpleToBlue"  onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
                {commentError && <Alert color="failure">{commentError}</Alert>}
                </>
            )
        }
        {comments.length === 0 ? (<p className='text-sm my-5'>No comments yet</p>) : 
        (
            <>
            <div className='flex justify-start items-center mt-2 gap-1'>
                <p>Comments</p>
                <div className=' px-3 bg-gray-300 font-bold select-none'>{comments.length}</div>
            </div>
            {
                comments.map((c)=>
                    <Comment comment={c} key={c._id} onLike={handleLikes} onEdit={handleEdit} onDelete={(commentId)=>{
                        setShowModel(true);
                        setCommentToDelete(commentId)
                    }}></Comment>
                )
            }
            </>
        )}
        <Modal show={showModel} onClose={()=>setShowModel(false)} popup size="md">
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className='h-10 w-10 text-gray-400 dark:text-gray-200 mb-4 mx-auto' ></BsExclamationCircle>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment?</h3>
            <div className='flex justify-center gap-6'>
            <Button color="failure" onClick={()=>handleDelete(commentToDelete)}>Yes , I'm sure</Button>          
            <Button className='bg-gray-700 ' onClick={()=>setShowModel(false)}>No, cancel</Button> 
            </div>         
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
