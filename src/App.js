import './App.css';
import MainComponent from './Components/MainComponent/MainComponent';
import Sidebar from './Components/SidebarComponent/Sidebar';
import { RxChatBubble, RxCircle, RxHamburgerMenu, RxStar, RxTrash } from 'react-icons/rx'
import { PiVinylRecordThin, PiUserCircleFill } from 'react-icons/pi'
import { IoCallOutline, IoSettingsOutline } from "react-icons/io5"
import { FiArrowLeft } from "react-icons/fi";
import logo from '../../whatsapp-clone/src/assets/whatsapp_logo.png'
import Signin from './Components/Signin/Signin'
import { useContext, useState } from 'react';
import { AuthContext } from './Contexts/AuthContext';
import Signup from './Components/Signup/Signup';
import avatarImage from '../src/assets/avatar.png'
import Profile from './Components/ProfilePopup/Profile';


function App() {

  const {currentUser} = useContext(AuthContext)
  console.log('current-user',currentUser);

  const [profile, setProfile] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(true)

  const handleIcons = () => {
    setShowIcons(prev => !prev)
  }


  const handleProfile = () => {
    setProfile(prevState => !prevState)
  }

  


  const toggleSidebarChat = () => {
    setToggleSidebar(prev => !prev)
  }

  return (
    <div className="app">
    {currentUser ? 
      
        <>
          <div className="header">
            <img src={logo} alt='whatsapp logo' className='logo'/>
            <p>WhatsApp</p>
          </div>
          <div className={`app__mainIconLists ${showIcons ? 'show__icons-bg': ''}`}>
            <div className='app__upperIcons'>
              <div className='app__icon-wrapper' onClick={handleIcons}>
                <RxHamburgerMenu className='app__icons'/>
                {showIcons && <p className='icon__text'><FiArrowLeft /></p>}
              </div>
              <div className='app__icon-wrapper'>
                <RxChatBubble className='app__icons' onClick={toggleSidebarChat}/>
                {showIcons && <p className='icon__text'>Chats</p>}
              </div>
              <div className='app__icon-wrapper'>
                <IoCallOutline className='app__icons'/>
                {showIcons && <p className='icon__text'>Call</p>}
              </div>
              <div className='app__icon-wrapper'>
                <PiVinylRecordThin className='app__icons'/>
                {showIcons && <p className='icon__text'>Status</p> }
              </div>
              <div className='app__icon-wrapper'>
                <RxCircle className='app__icons meta__AI'/>                
                {showIcons && <p className='icon__text'>Meta AI</p>}
              </div>
            </div>
            <div className='app__downIcons'>
              <div className='app__icon-wrapper'>
                <RxStar className='app__icons'/>               
                {showIcons && <p className='icon__text'>Stared messes</p> }
              </div>
              <div className='app__icon-wrapper'>
                <RxTrash className='app__icons'/>                              
                {showIcons && <p className='icon__text'>Archived chs</p> }
              </div>
              <div className='app__icon-wrapper'>
                <IoSettingsOutline className='app__icons'/>                                             
                {showIcons && <p className='icon__text'>Settings</p>}
              </div>
              <div className='app__icon-wrapper'>
                {/* <PiUserCircleFill className='app__icons'/> */}
                <img className='app__icons avatar__img_profile' src={currentUser.photoURL} alt="avatar" onClick={handleProfile}/>
                {profile && <Profile />}
                                                             
                {showIcons && <p className='icon__text'>Profile</p>}
              </div>

            </div>
          </div>
            <div className="app__container">
              <div className="app__body">
                {toggleSidebar && <Sidebar displaySidebar={setToggleSidebar}/>}
                <MainComponent profile={setProfile}/>

              </div>
            </div>

            <div>
          </div>
        </> :
        <Signin /> 
     } 
      
        
    </div>
  );
}

export default App;
