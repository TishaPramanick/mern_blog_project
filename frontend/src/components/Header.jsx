import React from 'react'
import {Link , useLocation} from "react-router-dom"
import {Avatar, Button, Dropdown, Navbar, TextInput} from "flowbite-react";
import { FiSearch  } from "react-icons/fi";
import {FaMoon , FaSun} from "react-icons/fa";
import { useSelector , useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


export default function Header() {
    const dispatcher = useDispatch();
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state)=>state.user);
    const {theme} = useSelector((state)=>state.theme);
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='flex items-end whitespace-nowrap text-sm sm:text-sm font-semibold dark:text-white ml:0 xl:ml-24'>
            <span className='px-2.5 pb-0.5 pr-0.5 py-1 bg-gradient-to-br from-purple-950 to-cyan-400
                rounded-md text-white mr-0 text-xl'>Coder'S</span>
            <span className='uppercase text-xl font-bold text-blue-950 dark:text-white'>pace</span>
        </Link>
        <form action="">
            <TextInput
                type="text"
                placeholder = "Search..."
                rightIcon={FiSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color="gray" >
            <FiSearch></FiSearch>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline enabled:hover:bg-gray-100 focus:ring-0 bg-gray-50 dark:enabled:hover:bg-transparent dark:focus:ring-0 dark:bg-gray-700 dark:text-white ' color="gray" onClick={()=>{dispatcher(toggleTheme())}}>
                {(theme === "light") ? <FaMoon></FaMoon> : <FaSun></FaSun>}
            </Button>
            {
                currentUser ? (
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
                        <Dropdown.Item>Sign Out</Dropdown.Item>

                    </Dropdown>
                </>) : (
                <>
                <Link to="/sign-in" className='mr-0 xl:mr-24'>
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
            <Navbar.Link active={path === '/about'} href='/about'>
                About
            </Navbar.Link>
            <Navbar.Link href='/projects'>
                Projects
            </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
