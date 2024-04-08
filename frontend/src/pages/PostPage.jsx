import axios from 'axios';
import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {Link} from "react-router-dom"
import CommentSection from '../components/CommentSection';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/user/userSlice';
import cryptoJs from 'crypto-js';
import PostCard from '../components/PostCard';

export default function PostPage() {

    const dispatcher = useDispatch();
    const {postSlug} = useParams();
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);
    const [post , setPost] = useState(null);
    const [recentPosts , setRecentPosts] = useState(null);
    

    const fetchSinglePost = async()=>{
        try {
            setLoading(true);
            const res = await axios.get(`/api/post/posts?slug=${postSlug}`).catch(err => {setLoading(false); setError(true); return;});

            const data = res.data;
            setPost(data.posts[0]);

            const encrypted = cryptoJs.AES.encrypt(JSON.stringify(data.posts[0]._id) , "postId");

            localStorage.setItem("selectedPost" , encrypted);
            setLoading(false);
            setError(false);

        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }
    useEffect(()=>{
        dispatcher(getUser());
        fetchSinglePost();
    } , [])




    useEffect(()=>{
        try {
            const fetchRecentPosts = async ()=>{
               const res = await axios.get("/api/post/posts?limit=3").catch(err => console.log(err));
               
               const data = res.data;
               setRecentPosts(data.posts);
            }

            fetchRecentPosts();
        } catch (error) {
            console.log(error);
        }
    } , [])

    if(loading){
        return(
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size="xl"/>
            </div>
        )
    }
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
        <Link to={`search?category=${post && post.category}`} className='self-center mt-5'>
            <Button color="gray" pill size="xs">{post && post.category}</Button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'></img>
        <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            
            <span className='italic'>{post && (((post.content.length/1000).toFixed(0) == 0) ? 1 : (post.content.length/1000).toFixed(0)) } min reads</span>
        </div>

        <div className='p-3 max-w-2xl mx-auto w-full post-content overflow-hidden' dangerouslySetInnerHTML={{__html : post && post.content}}>
        </div>

        <div className='max-w-4xl mx-auto w-full'>
          <CommentSection postId={localStorage.getItem("selectedPost")}></CommentSection>
        </div>

        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-xl mt-5'>Recent Articles</h1>
            <div className='flex flex-col gap-5 flex-wrap 2xl:flex-nowrap md:flex-wrap py-10 sm:flex-row sm:flex-wrap overflow-hidden'>
                {
                    recentPosts && recentPosts.map((post)=> 
                        <PostCard key={post._id} post={post}/>
                        
                    )
                }
            </div>
        </div>
    </main>
    )
}
