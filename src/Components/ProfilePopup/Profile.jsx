import React, { useContext } from 'react'
import { RxPencil1 } from 'react-icons/rx'
import '../ProfilePopup/Profile.css'
import imageExample from '../../assets/avatar.png'
import { AuthContext } from '../../Contexts/AuthContext'

import { FiAirplay } from "react-icons/fi";
import { GoKey, GoBell  } from "react-icons/go";
import { PiChatsCircleLight } from "react-icons/pi";
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { BsBrush } from "react-icons/bs";
import { CgDrive } from "react-icons/cg";
import { FaRegKeyboard } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { SlBell } from "react-icons/sl";
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { toast } from 'react-toastify'




const Profile = () => {

  const logOut = () => {
    signOut(auth).then(() => {
    toast.success('Logout successfully')
    }).catch((error) => {
      toast.error(`${error}`)
    });

  }


  const {currentUser} = useContext(AuthContext)
  return (
    <div className='profile'>
      <div className="profile__display">
        <div className='profile__container'>
            <div className="profile__option">
              <FiAirplay className='profilepopup__icons' size={20}/>
              <p>General</p>
            </div>
            <div className="profile__option">
              <GoKey className='profilepopup__icons' size={20}/>
              <p>Account</p>
            </div>
            <div className="profile__option">
              <PiChatsCircleLight className='profilepopup__icons' size={20}/>
              <p>Chats</p>
            </div>
            <div className="profile__option">
              <HiOutlineVideoCamera className='profilepopup__icons' size={20}/>
              <p>Video & Calls</p>
            </div>
            <div className="profile__option">
              <SlBell className='profilepopup__icons' size={20}/>
              <p>Notifications</p>
            </div>
            <div className="profile__option">
              <BsBrush className='profilepopup__icons' size={20}/>
              <p>Personalization</p>
            </div>
            <div className="profile__option">
              <CgDrive className='profilepopup__icons' size={20}/>
              <p>Storage</p>
            </div>
            <div className="profile__option">
              <FaRegKeyboard className='profilepopup__icons' size={20}/>
              <p>Shortcuts</p>
            </div>
            <div className="profile__option">
              <IoIosHelpCircleOutline className='profilepopup__icons' size={20}/>
              <p>Help</p>
            </div>

        </div>

      
        <div className="profile__right">
          <div className='profile__avatar' >
           <img src={`${currentUser?.photoURL} || ${imageExample}`} alt="avatar" /> 

          </div>
          <div className="profile__name">
          <h3>{currentUser?.displayName}</h3>
              <RxPencil1 className='profilepopup__icons' size={20}/>
          </div>
          <div className="profile__about">
            <p>About</p>
              <RxPencil1 className='profilepopup__icons' size={20}/>
          </div>
          <div className="profile__number">
            <p>Phone number</p>
            <p>+234567890987</p>
          </div>
          <div className="profile__logout">
            <p onClick={logOut}>Logout</p>
            <p>Chat history will be cleared when you log out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
