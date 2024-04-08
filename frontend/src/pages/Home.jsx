import React, { useEffect , useState } from 'react'
import { Navigate } from 'react-router';
import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
import About from './About';

axios.defaults.withCredentials = true;
let firstRender = true;

export default function Home({user}) {

  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/posts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 py-32 mx-auto bg-gradient-to-br from-purple-950 to-cyan-800 text-white px-10 sm:px-28 dark:text-white '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-100 text-sm sm:text-lg'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>


      <div className='max-w-full flex flex-col gap-8 py-7 px-10 sm:px-0'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex justify-center items-center flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
      <div id='about' className='flext justify-center py-20 items-center w-full bg-gradient-to-br from-purple-950 to-cyan-800 text-white px-10 sm:px-28 dark:text-white '>
        <h3 className='font-bold text-4xl pb-5 '>About Us</h3>
        <div className='pb-5'>Hey🖐️ users!! I am <span className='font-semibold'>Tisha Pramanick</span> the creator of the CoderSpace , this is a blogging site for developers , where they can share their knowledge into the world wide web WWW. <br/>
                So, I am also an developers and i have created this site for my learning purpose and with the help of this I can take more deep dive into the MERN stack world.
                <br/> Thanks to <span className='font-bold'>Code With Sahand</span> for this amazing blog site.
        </div>
      </div>
    </div>
  );
}