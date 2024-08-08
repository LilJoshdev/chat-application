import React, { useContext, useEffect, useState } from 'react'
import "../SidebarComponent/Sidebar.css"
import { PiNotePencil } from 'react-icons/pi'
import { IoFilter } from 'react-icons/io5'
import { LiaSearchSolid } from 'react-icons/lia'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import SidebarLeftChat from '../SidebarLeftChat/SidebarLeftChat'
import FilterPopup from '../FilterPopup/FilterPopup'
import AddUser from '../AddUserPopup/AddUser'

import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase"
import { Bars } from 'react-loader-spinner'
import { AuthContext } from '../../Contexts/AuthContext'
import { ChatContext } from '../../Contexts/ChatContext'


function Sidebar({displaySidebar}) {
  const [open , setOpen ] = useState(false)
  
  const [searchUserInput, setSearchUserInput] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)
  
  const [chats, setChats] = useState([])
  const [addMode, setAddMode] = useState(false)
  const [matches, setMatches] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [showSidebar, setShowSidebar] = useState(true)



 
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth < 768) {
  //         console.log('Viewport width is less than 768px');
  //     } else {
  //         console.log('Viewport width is 768px or more');
  //     }
  //   });

  // },[])




  const handleAdd = () => {
    setAddMode(prev => !prev)
    setOpen(false)
  }

  const handleSearch = async() => {
    console.log('searching');
    // setLoading(true)

    const users = collection(db, "users");
    // console.log('usssseeee',users)
    console.log('usssseeee',user)

    const q = query(users, where("displayName", "==", searchUserInput));

    try {
      setLoading(true)
      const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {

          setUser(doc.data())
          
          setLoading(false)         
        });
      
      } catch (error) {
      setLoading(false)
      setErr(true)
      toast.error(`${error}`)
    }
    //  setUser(null)
    setSearchUserInput("")
  }


  const handleKeyPress = (event) => {
    // console.log(event)
    event.key === "Enter" && handleSearch()
  }

  //close sidebar for mobile view 

  useEffect(() => {
    const handler = function(e) { 
      setMatches(e.matches);
      // matches && displaySidebar(false)
    };
    window.matchMedia('(max-width: 768px)').addEventListener('resize', handler);
    return () => {
      window.matchMedia('(max-width: 768px)').removeEventListener('resize', handler);
    }
  }, []);

  const clickSearchedUser = async(usr) => {
    console.log('clicked')
    console.log("userChats, chats loading...")
    matches && displaySidebar(false)


    // handler()

  
    // combine the 2 users id to fetch both chats together.
    const joinId = currentUser?.uid > user?.uid ? currentUser?.uid + user?.uid : user?.uid + currentUser?.uid
    //console.log(joinId)

    try { // get a document
          // get chats
          const docRef = doc(db, "chats", joinId);
          const docSnap = await getDoc(docRef);
      
          // if theres no chats, create a new one in that collection called 'chats'
          if(!docSnap.exists()) {
            await setDoc(doc(db, "chats", joinId), { messages: [] })
      
            // create user chats
            await updateDoc(doc(db, "usersChat", currentUser?.uid), {
              [joinId+".userInfo"]: {
                uid: user?.uid,
                displayName: user?.displayName,
                photoURL: user?.photoURL
              },
              [joinId+".date"]: serverTimestamp()
            })
            // 2nd user
            await updateDoc(doc(db, "usersChat", user?.uid), {
              [joinId+".userInfo"]: {
                uid: currentUser?.uid,
                displayName: currentUser?.displayName,
                photoURL: currentUser?.photoURL,
              },
              [joinId+".date"]: serverTimestamp()
            })
          }
      
        } catch (error) {
          console.log(error)
        }

        // Remove user after the search result
        setUser(null)
        
        // Display the user chat messages
        
        dispatch({ type:"CHANGE_USER", payload: usr })
      }
      
      const clickedSearchResultUser = (usr) => {
        dispatch({ type:"CHANGE_USER", payload: usr })
      }
      // useEffect(() => {
      //    window.addEventListener('resize', () => {
      //      if (window.innerWidth < 768) {
      //       displaySidebar(false)
      //          console.log('Viewport width is less than 768px');
      //      } else {
      //          console.log('Viewport width is 768px or more');
      //      }
      //    });
  
      //  },[])
     


  useEffect(() => {
    // Getting chats in realtime using firebase onsnapshot()
    const fetchChats = () => {
      const unsub = onSnapshot(doc(db, "usersChat", currentUser.uid), (doc) => {
      // console.log("Current data: ", doc.data());
      setChats(doc.data())
      // console.log('dataaaaa', doc.data());
      });
      
     // cleanup
      return() => {
        unsub();
      };
    };

    currentUser.uid && fetchChats()
  },[currentUser.uid])

  //console.log('chatssss',chats) // returns an object. So we convert it to an array
  // console.log('chatsArray',Object.entries(chats))

  // console.log(user)



  const handleFilter = () => {
    setOpen(preState => !preState )
    setAddMode(false)
  }
  return (
  <div className='sidebar'>
      <div className="sidebar__header">
        <h1>chats</h1>
        <div className="sidebar__header-right">
          <PiNotePencil className='sidebar__icons' onClick={handleAdd}/>
          <IoFilter className='sidebar__icons' onClick={handleFilter}/>
          <FilterPopup open={open} className="filters"/>
          {addMode && <AddUser addMode={setAddMode}/>}

        </div>
      </div>

      <div className="sidebar__input">
        <LiaSearchSolid className='searchBar__searchIcon'/>
        <input type="text" placeholder='Search chat' onKeyDown={handleKeyPress} value={searchUserInput} onChange={event => setSearchUserInput(event.target.value)}/>
      </div>
      {
      loading && <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}><Bars height="40" width="40" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/><span>Please wait...</span></div>
      }


      <div className="sidebar__leftChats">
        {/* {err && <ToastContainer />} */}
        {err && <div style={{color: 'red', textAlign: 'center'}}>user not found</div>}

         <div className='sidebar__leftchat'>
         {user && <div className='leftchat__display user_search_result' onClick={()=>clickSearchedUser()}>
            <img className='avatar__img' src={`${user.photoURL}`} alt="avatar" />

            <div className="sidebar__leftchat-info">
              <p>{user.displayName}</p>
            </div>

          </div>}
          {
           chats && Object?.entries(chats)?.sort((a,b) => b[1]?.date - a[1]?.date)?.map((chat) => (

              <div className='leftchat__display' key={chat[0]} onClick={()=>clickedSearchResultUser(chat[1]?.userInfo)}>
                <img className='avatar__img' src={`${chat[1]?.userInfo?.photoURL}`} alt="avatar" />

                <div className="sidebar__leftchat-info">
                  <p>{chat[1]?.userInfo?.displayName}</p>
                  <p className='sidebar__message-part'>{chat[1]?.lastMessage?.text}</p>
                </div>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
