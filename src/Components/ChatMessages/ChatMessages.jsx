import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../../Contexts/ChatContext'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../lib/firebase';
import { AuthContext } from '../../Contexts/AuthContext';

const ChatMessages = ({file}) => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)

    const ref = useRef(null)
    console.log('reffff',ref);

    useEffect(() => {
      ref.current?.scrollIntoView({ behaviour: 'smooth'})
    },[messages])

    // useEffect(() => {
    // console.log('messages', messages);

    //     const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    //         console.log("Current data: ", doc.data());
    //         if(doc.exists()) {
    //             setMessages(doc.data().messages)
    //         }
    //     });

    //     return () => {
    //         unsub()
    //     }
    // },[data.chatId])
  return (
    <>

     <img src={file.url} alt='avatar-image' className=''/> 

      <div className="chat chat__receiver">
        <p>
        Hey whats up!
        </p>
        <div className="time__stamp">18:30</div>
      </div>
      
        
    </>
  )
}

export default ChatMessages
