import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsExclamationCircle } from "react-icons/bs";
import { FaCheck , FaTimes} from "react-icons/fa";
import {Button, Table, TableRow , Modal} from "flowbite-react"
import {Link} from "react-router-dom"

export default function DashComment() {
    const {currentUser} = useSelector(state => state.user);
    const [comments , setComments] = useState({});
    const [showMore , setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [commentToDelete , setCommentToDelete] = useState('');

    const fetchComments = async()=>{
        try {
            const res = await axios.get(`/api/user/getcomments`).catch(err => console.log(err));

            const data = await res.data;

            setComments(data.comments);
            if(data.comments.length < 9)
            {
              setShowMore(false);
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
       if(currentUser.isAdmin)
       {
        fetchComments();
       }
    } , [currentUser._id]);


    const handleShowMore = async()=>{
      const startIndex = comments.length;
      try {
        const res = await axios.get(`/api/user/getcomments?startIndex=${startIndex}`).catch(err => console.log(err));

        const data = await res.data;

        setComments((prev) => [...prev , ...data.comments]);
        if(data.comments.length <= 9)
        {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeleteUser = async()=>{
        setShowModel(false);
        try {
          const res = await axios.delete(`/api/user/admin-delete-user/${commentToDelete}`).catch(err => console.log(err));

          const data = await res.data;
          setComments((prev) => prev.filter((u)=> u._id !== commentToDelete));
          console.log(data);

        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300'>
      {(currentUser.isAdmin && comments.length > 0) ? <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Profile</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email Id</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            
           {
              comments.map((u) => 
              <Table.Body className='divide-y' key={u._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(u.createdAt).toLocaleDateString()}</Table.Cell>

                  <Table.Cell>
                      <img src={u.profilePhoto} alt={u.name} className='w-10 h-10 object-cover bg-gray-500 rounded-full'/>
                  </Table.Cell>

                  <Table.Cell>
                      {u.name}
                  </Table.Cell>

                  <Table.Cell>{u.email}</Table.Cell>

                  <Table.Cell>{(u.isAdmin) ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/>}</Table.Cell>

                  <Table.Cell>
                    <span className='text-red-600 cursor-pointer font-medium' onClick={()=>{setShowModel(true); setCommentToDelete(u._id)}}>Delete</span>
                  </Table.Cell>

                </Table.Row>
              </Table.Body>
              )
           }
          </Table>
           {
            showMore && <Button className='show-more-btn w-full bg-transparent focus:bg-transparent focus:ring-0 focus:border-0 text-cyan-700 self-stretch text-sm py-7'
            onClick={handleShowMore}>Show More</Button>
           }
      </> : <><p>You have no posts yet!!</p></>}

      <Modal show={showModel} onClose={()=>setShowModel(false)} popup size="md">
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className='h-10 w-10 text-gray-400 dark:text-gray-200 mb-4 mx-auto' ></BsExclamationCircle>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
            <div className='flex justify-center gap-6'>
            <Button color="failure" onClick={handleDeleteUser} >Yes , I'm sure</Button>          
            <Button className='bg-gray-700 ' onClick={()=>setShowModel(false)}>No, cancel</Button> 
            </div>         
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
