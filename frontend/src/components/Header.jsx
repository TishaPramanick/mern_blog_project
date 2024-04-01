import React from 'react'
import {Link , useLocation} from "react-router-dom"
import {Button, Navbar, TextInput} from "flowbite-react";
import { FiSearch  } from "react-icons/fi";
import {FaMoon} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='flex items-end whitespace-nowrap text-sm sm:text-sm font-semibold dark:text-white ml:0 xl:ml-24'>
            <span className='px-2.5 pb-0.5 pr-0.5 py-1 bg-gradient-to-br from-purple-950 to-cyan-400 
                rounded-md text-white mr-0 text-xl'>Coder'S</span>
            <span className='uppercase text-xl font-bold text-blue-950'>pace</span>
        </Link>
        <form action="">
            <TextInput
                type="text"
                placeholder = "Search..."
                rightIcon={FiSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color="gray">
            <FiSearch></FiSearch>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color="gray">
                <FaMoon></FaMoon>
            </Button>
            <Link to="/sign-in" className='mr-0 xl:mr-24'>
                <Button gradientDuoTone="purpleToBlue">
                     Sign In
                </Button>
            </Link>
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
