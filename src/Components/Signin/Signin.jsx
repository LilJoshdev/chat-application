import React, { useState } from 'react'
import '../Signin/Signin.css'
import { IoDocumentAttachOutline } from 'react-icons/io5'
import { PiUserCircleFill } from 'react-icons/pi'
import logo from '../../assets/whatsapp_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
  // const [file, setFile] = useState("")
  // const [ avatar, setAvatar ] = useState({file: null, url: ''})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value


    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      toast.success('Login successfully')
      
      navigate('/')
    } catch (error) {
      toast.error(`${error}`)
    }


  }

  return (
    <div className='form__container'>
      <div className="logo__display">
      <img src={logo} alt="" className='register-logo'/>
      <p>Login</p>
      <ToastContainer />
    </div>
    <form action="" className='form' onSubmit={handleSubmit}>
    
      <div className="form__group">
        <input type="email" className="form__input" placeholder="@gmail" id="email" required />
        <label htmlFor="email" className="form__label">Email address</label>
      </div>

      <div className="form__group">
        <input type="password" className="form__input" placeholder="Enter Password" id="password" required />
        <label htmlFor="password" className="form__label">Password</label>
      </div>

      <div className="form__group container">
        <button className="form__input btn">Login &rarr;</button>
        <span className='account__created'>Don't have an account? <Link to="/signup">Register</Link></span>

      </div>
    </form>
    </div>
  )
}

export default Signin
