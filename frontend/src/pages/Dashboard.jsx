import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';

export default function Dashboard() {
  const location = useLocation();
  const [tab , setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);

    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  } , [location.search]);
  return (
    <div className='min-h-80 flex flex-col md:flex-row'>
      <div className='md:w-64'>
        {/* Sidebar */}
        <DashSidebar tab = {tab} className="bg-black"></DashSidebar>
      </div>
        {/* profile */}
        {(tab === "profile") && <DashProfile></DashProfile>}
        {/* posts */}
        {(tab === "posts") && <DashPosts></DashPosts>}
        {/* users */}
        {(tab === "users") && <DashUsers></DashUsers>}
        {/* comment */}
        {(tab === "comments") && <DashComment></DashComment>}
    </div>
  )
}
