import React, { useState } from 'react'
import {Link , useLocation } from "react-router-dom"
import {Avatar, Button, Dropdown, Navbar, TextInput} from "flowbite-react";
import { FiSearch  } from "react-icons/fi";
import {FaMoon , FaSun} from "react-icons/fa";
import { useSelector , useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import axios from "axios";
import {signOutFailure , signOutSuccess} from '../redux/user/userSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Header() {
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state)=>state.user);
    const {theme} = useSelector((state)=>state.theme);
    const [searchTerm , setSearchTerm] = useState("");
    const [searchBar , setSearchBar] = useState("hidden");
    const location = useLocation()
console.log(searchTerm);
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        if(searchTermFromUrl)
        {
            setSearchTerm(searchTermFromUrl);

        }
    } , [location])

    
    const handleLogout = async()=>{
        try {
          const res = await axios.get("/api/user/logout").catch(err => dispatcher(signOutFailure(err.response.data.message)));
  
          const data = await res.data;
  
          if(data.status)
          {
            dispatcher(signOutSuccess());
            localStorage.clear();
            navigate("/");
          }
        } catch (error) {
          dispatcher(signOutFailure(error.response.data.message))
        }
    }

    const handleSearch = (e)=>{
        e.preventDefault();
        console.log(searchTerm)
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("searchTerm" , searchTerm);
        const searchQuery = urlParams.toString();
        navigate("/search?"+searchQuery);
    }
  return (
    <>
            <Navbar className='border-b-2 '>
        <Link to="/" className='flex items-end whitespace-nowrap text-sm sm:text-sm font-semibold dark:text-white ml:0 xl:ml-24'>
            <span className='px-2.5 pb-0.5 pr-0.5 py-1 bg-gradient-to-br from-purple-950 to-cyan-400
                rounded-md text-white mr-0 text-xl'>Coder'S</span>
            <span className='uppercase text-xl font-bold text-blue-950 dark:text-white'>pace</span>
        </Link>
        <form onSubmit={handleSearch}>
            <TextInput
                type="text"
                placeholder = "Search..."
                rightIcon={FiSearch}
                className='hidden lg:inline'
                defaultValue={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}

            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color="gray" onClick={()=>{(searchBar === "hidden") ? setSearchBar("block") : setSearchBar("hidden")}}>
            <FiSearch></FiSearch>
        </Button>
        <div className='flex gap-2 md:order-2 mr-0 xl:mr-20'>
            <Button className='w-12 h-10 sm:inline enabled:hover:bg-gray-100 focus:ring-0 bg-gray-50 dark:enabled:hover:bg-transparent dark:focus:ring-0 dark:bg-gray-700 dark:text-white ' color="gray" onClick={()=>{dispatcher(toggleTheme())}}>
                {(localStorage.getItem("theme") === "light") ? <FaMoon></FaMoon> : <FaSun></FaSun>}
            </Button>
            {
                (currentUser && localStorage.getItem("loginStatus")) ? (
                <>
                    <Dropdown
                        arrowIcon={false}
                        inline 
                        label ={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePhoto}
                                rounded
                            ></Avatar>
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.name}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider></Dropdown.Divider>
                        <Dropdown.Item onClick={handleLogout} as="button">Sign Out</Dropdown.Item>

                    </Dropdown>
                </>) : (
                <>
                <Link to="/sign-in" className='mr-0 xl:mr-2'>
                    <Button gradientDuoTone="purpleToBlue">
                        Sign In
                    </Button>
                </Link>
                </>)
            }
            
            <Navbar.Toggle className='border-0'></Navbar.Toggle>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} href='/'>
                Home
            </Navbar.Link>
            <Navbar.Link href='#about'>
                About
            </Navbar.Link>
    
            </Navbar.Collapse>

    </Navbar>
    <div className={`${searchBar}`}>
        <form onSubmit={handleSearch}>
            <TextInput
                type="text"
                placeholder = "Search..."
                rightIcon={FiSearch}
                className='lg:hidden'
                defaultValue={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}

            />
        </form>
    </div>
    </>

  )
}
