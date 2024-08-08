import React, { useState } from 'react'
import '../Signup/Signup.css'
import { IoDocumentAttachOutline } from 'react-icons/io5'
import { PiUserCircleFill } from 'react-icons/pi'
import logo from '../../assets/whatsapp_logo.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../../lib/firebase'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import upload from '../../lib/upload'
import { Bars, Discuss } from "react-loader-spinner"

const Signup = () => {
  const [file, setFile] = useState("")
  const [ avatar, setAvatar ] = useState({file: null, url: ''})
  const [loading, setLoading] = useState(false)

  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()

  const navigate = useNavigate()

  const handleAvatar = (event) => {
    const uploadAvatar = event.target.files[0]

    if(uploadAvatar) {
      setAvatar({
        file: event.target.files[0],
        url: URL.createObjectURL(event.target.files[0])
      })

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const photoURL = e.target[0].files[0]
    const email = e.target[1].value
    const displayName = e.target[2].value
    const password = e.target[3].value


    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)

      const file = await upload(photoURL)
      if(file) setLoading(true)

        await updateProfile(response.user, {
          displayName,
          photoURL: file,
        })
        
        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          displayName,
          email,
          photoURL: file
        })
        
        await setDoc(doc(db, "usersChat", response.user.uid), {})
        
        
        toast.success("Account created successfully 👍! Redirecting...");
        setLoading(false)
      
      navigate('/login')
    } catch (error) {
      toast.error("Something went wrong ", error)
    }


  }

  return (
    <div className='form__container'>
      <div className="logo__display">
      <img src={logo} alt="" className='register-logo'/>
      <p>Create an account</p>

      </div>
    <form action="" className='form' onSubmit={handleSubmit}>
        <ToastContainer />
        {loading && <div className='loader_container'>
          <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>}

      <div className="form__group upload">
        <label htmlFor="file" className="form__label image__upload" >
          <IoDocumentAttachOutline className='footer__icons'/>
          Upload img
        </label>
          {/* <RxAvatar /> */}
          {avatar.url ? <img src={avatar.url} alt='avatar-image' className='uploaded__img'/> : <PiUserCircleFill className='uploaded__img'/> }
          <input type="file" id='file' onChange={handleAvatar}  style={{display: 'none'}}/>

      </div>
      <div className="form__group">
        <input type="email" className="form__input" placeholder="@gmail" id="email" required />
        <label htmlFor="email" className="form__label">Email address</label>
      </div>
      <div className="form__group">
        <input type="text" className="form__input" placeholder="username" id="username" required />
        <label htmlFor="email" className="form__label">Username</label>
      </div>

      <div className="form__group">
        <input type="password" className="form__input" placeholder="Enter Password" id="password" required />
        <label htmlFor="password" className="form__label">Password</label>
      </div>

      <div className="form__group container">
        <button className="form__input btn">Create account &rarr; </button>
        <span className='account__created'>Already have an account? <Link to="/login">Login in</Link></span>
      </div>
    </form>
    
    </div>
  )
}

export default Signup

