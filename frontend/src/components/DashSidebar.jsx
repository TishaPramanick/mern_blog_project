import React from 'react'
import {Sidebar} from "flowbite-react"
import {Link} from "react-router-dom"
import {HiUser , HiArrowSmRight} from "react-icons/hi";
export default function DashSidebar({tab}) {
  return (
    <Sidebar className='side w-full md:w-64'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to="/dashboard?tab=profile">
                    <Sidebar.Item active={tab === "profile"} icon={HiUser} label={"User"} labelColor = "dark">
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
