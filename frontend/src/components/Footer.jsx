import { Footer } from 'flowbite-react'
import {Link} from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import React from 'react'

export default function FooterComp() {
    return (
        <Footer container className=' rounded-none bg-gray-200'>
            <div className='w-full max-w-7xl mx-auto pt-4 pb-2'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-0 mb-5 '>
                        <Link to="/" className='flex items-end whitespace-nowrap text-sm sm:text-sm font-semibold dark:text-white ml:0 xl:ml-24'>
                            <span className='px-2.5 pb-0.5 pr-0.5 py-1 bg-gradient-to-br from-purple-950 to-cyan-400 
                rounded-md text-white mr-0 text-xl'>Coder'S</span>
                            <span className='uppercase text-xl font-bold text-blue-950 dark:text-white'>pace</span>
                        </Link>
                    </div>
                    <div className='grid grid-cols-3 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-8'>
                        <div>
                        <Footer.Title title='about' className='uppercase'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='https://www.google.com'
                                target='_blank'
                            >
                                100 JS Projects
                            </Footer.Link>
                            <Footer.Link
                                href='https://www.google.com'
                                target='_blank'
                            >
                                100 JS Projects
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title='Follow Us' className='uppercase'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='https://www.google.com'
                                target='_blank'
                            >
                                LikedIn
                            </Footer.Link>
                            <Footer.Link
                                href='https://www.google.com'
                                target='_blank'
                            >
                                GitHub
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title='Legal' className='uppercase'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='#'
                               
                            >
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link
                                href='#'
                               
                            >
                                Terms & Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                    <div className='w-full sm:flex sm:justify-between sm:items-center'>
                        <Footer.Copyright href='#' by="Coder's Space Team" year={new Date().getFullYear()}></Footer.Copyright>
                        <div className='flex items-center justify-center text-gray-500'><span className='text-sm font-medium'>Created with </span><IoHeartSharp></IoHeartSharp></div>
                   
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={FaFacebook}></Footer.Icon>
                        <Footer.Icon href='#' icon={RiInstagramFill}></Footer.Icon>
                        <Footer.Icon href='#' icon={FaGithub}></Footer.Icon>
                        <Footer.Icon href='#' icon={FaSquareXTwitter}></Footer.Icon>
                    </div>
                    </div>
            </div>
        </Footer>
    )
}
