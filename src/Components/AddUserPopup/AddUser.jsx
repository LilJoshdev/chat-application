import React, { useContext, useState } from 'react'
import avatar from '../../assets/avatar.png'
import '../../Components/AddUserPopup/AddUser.css'
import { PiPlus } from 'react-icons/pi'
import { LiaSearchSolid } from 'react-icons/lia'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { AuthContext } from '../../Contexts/AuthContext'

const AddUser = ({addMode}) => {
  const [user, setUser] = useState(null)

  const {currentUser} = useContext(AuthContext)

   const handleSearch = async(e) => {
    e.preventDefault()

    const displayName = e.target[0].value
    console.log('searching');
    // setLoading(true)



    const users = collection(db, "users");
    // console.log('usssseeee',users)

    const q = query(users, where("displayName", "==", displayName));

    try {
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data())
        // setError(true)
        // setLoading(false)

        // toast.error("user not found. Add a user!")

      }else {

        querySnapshot.forEach((doc) => {
          // setLoading(true)

          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log('json', " => ", doc.json());
          setUser(doc.data())
          
          // setLoading(false)
        });
      }
      
    } catch (error) {
      console.log(error)
      // setError(true)

    }
    //  setUser(null)
    // setSearchUserInput("")
    console.log('user',user)
  }

  const handleAdd = async() => {
    // combine the 2 users id.
    const joinId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

    try {


      // get a document
      // get chats
      const docRef = doc(db, "chats", joinId);
      const docSnap = await getDoc(docRef);
  
      // if theres no chats, create a new one in that collection
      if(!docSnap.exists()) {
        await setDoc(doc(db, "chats", joinId), { messages: [] })

      }
        // create user chats
      await updateDoc(doc(db, "usersChat", currentUser.uid), {
        [joinId+".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        [joinId+".date"]: serverTimestamp()
      })

      // 2nd user
      await updateDoc(doc(db, "usersChat", user.uid), {
        [joinId+".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [joinId+".date"]: serverTimestamp()
      })

      addMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div  className='adduser'>
      <form action="" className='user_form' onSubmit={handleSearch}>
        <input type="text" placeholder='username' name='username'/>
        <button>search</button>
        {/* <LiaSearchSolid className='searchBar__searchIcon'/> */}

      </form>

      {user && <div className="user_detail">
        <div className="detail" onClick={handleAdd}>
            <img src={`${user.photoURL} || ${avatar}`} alt="avatar" className='avatar_user' />
            <span>{user.displayName}</span>
        </div>
        <button ><PiPlus /> </button>
      </div>}
    </div>
  )
}

export default AddUser
