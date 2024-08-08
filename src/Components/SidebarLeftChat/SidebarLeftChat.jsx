import React from 'react'
import "../SidebarLeftChat/SidebarLeftChat.css"
import { PiUserCircleFill } from 'react-icons/pi'
import avatarImage from '../../assets/avatar.png'


const SidebarLeftChat = ({user}) => {
  // const { user, displayUsers, selectUserChat} = props
  //console.log('AllChats',chats); // rendering as Object.entries
  return (
    <div className='sidebar__leftchat'  >
      {/* {error && <h4>User not found</h4>} */}
          {/* {user && 
          
            Object.entries(displayUsers)?.sort((a,b) => b[1].date -a[1].date).map(chat => (
              // console.log("dchats",chat)
              <div className='leftchat__display' key={chat[0]} onClick={()=> selectUserChat(chat[1].userInfo)}>
                <img className='avatar__img' src={chat[1].userInfo.photoURL} alt="avatar" />

                <div className="sidebar__leftchat-info">
                  <p>{chat[1].userInfo.displayName}</p>
                  <p className='sidebar__message-part'>{chat[1].lastMessage?.text}</p>
                </div>

              </div>

            ))
          }  */}

          {/* <div className='leftchat__display' >
            <img className='avatar__img' src={`${user.photoURL}`} alt="avatar" />

            <div className="sidebar__leftchat-info">
              <p>{user.displayName}</p>
              <p className='sidebar__message-part'>last message</p>
            </div>

          </div> */}
   

    </div>
  )
}

export default SidebarLeftChat
