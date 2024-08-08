import React, { useContext, useEffect, useRef, useState } from 'react'
import "../MainComponent/MainComponent.css"
import { PiUserCircleFill } from 'react-icons/pi'
import { LiaSearchSolid } from 'react-icons/lia'
import { IoCallOutline, IoAttachOutline } from "react-icons/io5"
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { BsEmojiSmile } from 'react-icons/bs'
import { LuMic } from 'react-icons/lu'
import EmojiPicker from 'emoji-picker-react'


import imageExample from '../../assets/avatar.png'
import { ChatContext } from '../../Contexts/ChatContext'
import ChatMessages from '../ChatMessages/ChatMessages'
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { AuthContext } from '../../Contexts/AuthContext'
import upload from '../../lib/upload'
import { v4 as uuid } from 'uuid'
import { GoPaperAirplane } from 'react-icons/go'



const MainComponent = ({profile}) => {
  const [open, setOpen] = useState(false)

  const [text, setText] = useState("")
  const [files, setFiles] = useState({file: null, url: ""})
  const [messages, setMessages] = useState([])


  const { data } = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)
  // console.log('data', data);

  // const ref = useRef(null)
  //   console.log('reffff',ref);

  //   useEffect(() => {
  //     ref.current?.scrollIntoView({ behaviour: 'smooth'})
  //   },[messages])


  // Fetching messages in realtime using onsnapshot
  useEffect(() => {
    console.log('messages', messages);

        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            // console.log("Current data: ", doc.data());
            if(doc.exists()) {
                setMessages(doc.data().messages)
            }
        });

        //cleanup
        return () => {
            unsub()
        }
  },[data.chatId])
  


  const handleFile = (event) => {
    console.log(event)
    const uploadFile = event.target.files[0]

    if(uploadFile) {
      setFiles({
        file: event.target.files[0],
        url: URL.createObjectURL(event.target.files[0])
      })
    }
  }


  const handleMessage = async(e) => {
    e.preventDefault()
    let fileUrl = null

    // setText("")
    // if(text == "") return 

    try {
      if(files.file) {
        fileUrl = await upload(files.file, uuid());
      }

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          createdAt: Timestamp.now(),
          // file: fileUrl
          ...(fileUrl && { file: fileUrl})
        })
      });

      await updateDoc(doc(db, "usersChat", currentUser.uid), {
        [data.chatId+".lastMessage"]: {
          text
        },
        [data.chatId+".date"]: serverTimestamp(),
      }); 

      await updateDoc(doc(db, "usersChat", data.user.uid), {
        [data.chatId+".lastMessage"]: {
          text,
        },
        [data.chatId+".date"]: serverTimestamp(),
      });

    } catch (error) {
      console.log(error)
    }

    setFiles({
      file: null,
      url: ""
    })

    setText("")
  }
  
  const handleEmoji = (event) => {
    // console.log(event)
    setText(prev => prev + event.emoji)
    setOpen(false)

  }

  const closeEmoji = () => {
    setOpen(false)
    profile(false)
  }



  return (
    <div className='main__chat' >
      <div className="main__chatHeaderDisplay"> 
        <div className='main__chatHeader'>
          {data.user?.photoURL ? <img src={`${data.user?.photoURL}` } alt='avatar' className='main__chatHeader-icon'/> :<PiUserCircleFill size={30} color='grey'/>}
          <div className="main__chatInfo" >
            <p>{data.user?.displayName}</p>
            {/* <p>last seen: {new Date().getDate|| 'Today'}</p> */}
          </div>

        </div>

        <div className="main__chatIconRight">
          <HiOutlineVideoCamera className='app__icons'/>
          <IoCallOutline className='app__icons'/>
          <LiaSearchSolid className='app__icons'/>
          {/* <RxDotsVertical className='app__icons'/> */}
        </div>
      </div>
      

      <div className="main__chatBody" onClick={closeEmoji}>
        {/* <ChatMessages file={files.url}/> */}
        {/* <h1>hello</h1> */}


        {
          messages.map((msg) => (
            // console.log('msgggg', msg)
            <React.Fragment key={msg.id} >
            {/* <img src={msg.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='avatar-image' className={`chat ${msg.senderId === currentUser.uid && "chat__receiver"} file__uploads`}/>  */}
            {/* <img src={msg.file} alt="file-upload" className='file__uploads'/> */}

          {msg.file && <img src={msg.file} alt='uploaded-file' className={`chat ${msg.senderId === currentUser.uid && "chat__receiver"} file__uploads`}/> }

            <div className={`chat ${msg.senderId === currentUser.uid && "chat__receiver"}`}>
              <p>
              {msg.text}
              </p>
              {/* <div className="time__stamp">{JSON.stringify(new Date(msg.createdAt.seconds))}</div> */}
              <div className="time__stamp">
                {String(new Date(msg.createdAt?.toDate()).toLocaleTimeString('en-US', 
                  { 
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  }))
                }

              </div>
            </div>
            
            </React.Fragment>
          ))
        }

        {files.url && <img src={files.url} alt='uploaded-file' className='file__uploads'/> }

      </div>
      <div className="main__chatFooter">
          <BsEmojiSmile className='footer__icons emoji' onClick={()=> setOpen((prev) => !prev)}/>
        <div className="emojis">
          <EmojiPicker className='emoji__picker' open={open} onEmojiClick={handleEmoji}/>

        </div> 
        <form action="" onSubmit={handleMessage}>
          <label htmlFor="file">
          <IoAttachOutline className='footer__icons'/>

          </label>
          {/* {files.url && <img src={files.url} alt='uploaded-file' className='file__uploads'/> } */}

          <input type="file" id='file' onChange={handleFile} style={{display: 'none'}}/>
          <input type="text" placeholder="Type a message" value={text} onChange={e => setText(e.target.value)} />
          <button >
            <GoPaperAirplane />
          </button>
        </form>
        <LuMic className='footer__icons'/>
      </div>
    </div>
  )
}

export default MainComponent
