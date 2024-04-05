import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsExclamationCircle } from "react-icons/bs";
import {Button, Table, TableRow , Modal} from "flowbite-react"
import {Link} from "react-router-dom"

export default function DashPosts() {
    const {currentUser} = useSelector(state => state.user);
    const [userPosts , setUserPosts] = useState({});
    const [showMore , setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [postIdToDelete , setPostIdToDelete] = useState('');
    console.log(userPosts);

    const fetchPosts = async()=>{
        try {
            const res = await axios.get(`/api/post/posts?postedBy=${currentUser._id}`).catch(err => console.log(err));

            const data = await res.data;

            setUserPosts(data.posts);
            if(data.posts.length < 9)
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
        fetchPosts();
       }
    } , [currentUser._id]);


    const handleShowMore = async()=>{
      const startIndex = userPosts.length;
      try {
        const res = await axios.get(`/api/post/posts?postedBy=${currentUser._id}&startIndex=${startIndex}`).catch(err => console.log(err));

        const data = await res.data;

        setUserPosts((prev) => [...prev , ...data.posts]);
        if(data.posts.length <= 9)
        {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeletePost = async()=>{
        setShowModel(false);
        try {
          const res = await axios.delete(`/api/post/delete/${postIdToDelete}/${currentUser._id}`).catch(err => console.log(err));

          const data = await res.data;
          setUserPosts((prev) => prev.filter((p)=> p._id !== postIdToDelete));
          console.log(data);

        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300'>
      {(currentUser.isAdmin && userPosts.length > 0) ? <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell><span>Edit</span></Table.HeadCell>
            </Table.Head>
           {
              userPosts.map((p) =>
              <Table.Body className='divide-y' key={p._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(p.updatedAt).toLocaleDateString()}</Table.Cell>

                  <Table.Cell>
                    <Link to={`/post/${p.slug}`}>
                      <img src={p.image} alt={p.title} className='w-20 h-10 object-cover bg-gray-500'/>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                  <Link to={`/post/${p.slug}`} className=' font-semibold text-gray-800'>
                      {p.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{p.category}</Table.Cell>
                  <Table.Cell>
                    <span className='text-red-600 cursor-pointer font-medium' onClick={()=>{setShowModel(true); setPostIdToDelete(p._id)}}>Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${p._id}`}>
                      <span className='text-cyan-700 cursor-pointer font-medium'>Edit</span>
                    </Link>
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
            <Button color="failure" onClick={handleDeletePost}>Yes , I'm sure</Button>          
            <Button className='bg-gray-700 ' onClick={()=>setShowModel(false)}>No, cancel</Button> 
            </div>         
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
