import React, { useEffect, useState } from 'react'
import "../Verification/Verification.css"
import { IoDocumentAttachOutline } from 'react-icons/io5'
import { PiUserCircleFill } from 'react-icons/pi'
import logo from '../../assets/whatsapp_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Bars } from 'react-loader-spinner'
import { BsTelephone, BsTelephoneFill } from 'react-icons/bs'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../lib/firebase'
// import {  } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function Verification () {
  const [OTP, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false)
  const [phoneNum, setPhoneNum] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  // const [file, setFile] =  useState("")
  // const [ avatar, setAvatar ] = useState({file: null, url: ''})
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")



  useEffect(() => {
    window.recaptchaVerifier  = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
      
      },
      'expired-callback': () => {
       
      }
    })
  },[])
     


  function VerifyUsers() {
    setLoading(true)
    const recaptcha = window.recaptchaVerifier
    const phoneNumber = `+${phoneNum}`
    console.log('num', phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, recaptcha)
    .then((confirmationResult) => { 
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      toast.success('OTP sent successfully!');
    }).catch((error) => {
      setLoading(false);
      console.log(error)
      toast.error(`${error}`)
    });
  }

  function oTPVerify() {
    setLoading(true)
    window.confirmationResult.confirm(OTP).then(async (res) => {
      console.log(res)
      setLoading(false)
      navigate('/')
    }).catch(err => {
      console.log(err)
       toast.error(`${err}`)
    })
  }

  // useEffect(() => {
  //     if(!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //       'size': 'normal',
  //       'callback': (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         // onSignup()
  //       },
  //       'expired-callback': () => {
  //         // Response expired. Ask user to solve reCAPTCHA again.
  //         // ...
  //       }
  //     });
  //   }
  // },[])

  // function onCaptcha(){
    
  // }


  // async function onSignup(){
  //   // e.preventDefault()
  //   setLoading(true)

  //   const appVerifier = window.recaptchaVerifier;
  //   const phoneNumber = `+${phone}`;

  //   console.log('number', phoneNumber)


  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      
  //     // SMS sent. Prompt user to type the code from the message, then sign the
  //     // user in with confirmationResult.confirm(code).
  //     window.confirmationResult = confirmationResult;
  //     setLoading(false);
  //     setShowOTP(true);
  //     toast.success('OTP sent successfully');
  //   } catch (error) {
  //     console.error(error, 'SMS not sent');
  //     setLoading(false);
  //   }

  // }
  return (
    <div className='verification__container'>


      <div action="" className='otp-form'>
      <div className="otp-logo__display">
        <img src={logo} alt="" className='register-logo'/>
        {/* <p>Login</p> */}
        <ToastContainer />
      </div>
      <div id="recaptcha-container" style={{}}></div>

       { showOTP ? <>
          <h3>Enter OTP sent to your phone number</h3>


          <OTPInput className="otp" value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />

          {
            loading && <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}><Bars height="40" width="40" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/><span>Please wait...</span></div>
          }
          <div className="otp-form__group container">
              <button className="form__input btn" onClick={oTPVerify}>Submit &rarr;</button>
              <span className='account__created'>Don't have an account? <Link to="/signup">Register</Link></span>

          </div>
        
        </>:

        <>
        
          <h3>Verify phone number</h3>

          <div className='phone__input'>
            <BsTelephone size={30} color='green'/>  
            <PhoneInput className='otp' country={'ng'} value={phoneNum} onChange={setPhoneNum} inputStyle={{height: '50px', width: '400px', maxWidth: '95vw'}}/>
          </div>

          {
            loading && <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}><Bars height="40" width="40" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/><span>Please wait...</span></div>
          }
          <div className="otp-form__group container">
              <button className="form__input btn" onClick={VerifyUsers}>Send OTP via SMS &rarr;</button>
              <span className='account__created'>Don't have an account? <Link to="/signup">Register</Link></span>

          </div>
        </>}
        

      </div>
 
    </div>
  )
}

