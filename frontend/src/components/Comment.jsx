import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from "moment";
import { useSelector } from 'react-redux';
import { FaThumbsUp } from "react-icons/fa"
import { Button, Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike , onEdit , onDelete}) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const { currentUser } = useSelector(state => state.user);

    const getSingleUser = async () => {
        try {
            const res = await axios.get(`/api/user/getSingleUser/${comment.userId}`).catch(err => console.log(err));

            const data = await res.data;

            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit =  () => {
        setIsEditing(true);
        setEditContent(comment.content)
    }
    const handleSave = async() => {
        try {
            const res = await axios.put(`/api/comment/edit/${comment._id}` , {
                content : editContent
            }).catch(err => console.log(err));

            const data = await res.data;
            onEdit(comment , editContent);
            setIsEditing(false);


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSingleUser();
    }, [comment]);
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePhoto} alt={user.name} />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.name}` : 'anonymous user'}</span>
                    <span>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                {
                    isEditing ? (
                        <>
                        <Textarea
                            className='mb-2'
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div className='flex gap-2 justify-end text-xs'>
                            <Button type='button' size='sm' gradientDuoTone="purpleToBlue" outline onClick={handleSave}>
                                Save
                            </Button>
                            <Button type='button' size='sm' gradientDuoTone="purpleToBlue" onClick={()=>setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                        </>
                    ) :
                        (
                            <>
                                <p className='text-gray-500 pb-2 font-medium'>{comment.content}</p>
                                <div className='flex gap-2'>
                                    <button className={`hover:text-blue-600 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`} onClick={() => onLike(comment._id)}>
                                        <FaThumbsUp></FaThumbsUp>
                                    </button>
                                    <p className='text-sm'>
                                        {
                                            comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "Like" : "Likes")
                                        }
                                    </p>
                                    {
                                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                           <>
                                            <button className='hover:text-blue-600' onClick={handleEdit}>
                                                Edit
                                            </button>
                                            <button className='hover:text-blue-600' onClick={()=>onDelete(comment._id)}>
                                                Delete
                                            </button>
                                           </>
                                        )
                                    }
                                </div>
                            </>
                        )
                }

            </div>
        </div>
    )
}
