import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import { AuthContextProvider } from './Contexts/AuthContext';
import { ChatContextProvider } from './Contexts/ChatContext';
import Verification from './Components/Verification/Verification';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<App />}/>
            <Route path='signup' element={<Signup />}/>
            <Route path='login' element={<Signin />}/>
          </Routes>
        </Router>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
