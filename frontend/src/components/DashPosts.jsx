import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Button, Table, TableRow} from "flowbite-react"
import {Link} from "react-router-dom"

export default function DashPosts() {
    const {currentUser} = useSelector(state => state.user);
    const [userPosts , setUserPosts] = useState({});
    const [showMore , setShowMore] = useState(true);
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
        if(data.posts.length < 9)
        {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error)
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
                    <span className='text-red-600 cursor-pointer font-medium'>Delete</span>
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
    </div>
  )
}
