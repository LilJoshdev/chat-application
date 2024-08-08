import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../lib/firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext)

    //we need user and the joined ID to get the chat messages by clicking on the user
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        // changing user action when clicked
        switch (action.type) {
            case "CHANGE_USER":
            
            //update the state
            return {
                user: action.payload,
                chatId: currentUser?.uid > action.payload?.uid ? currentUser?.uid + action.payload?.uid : action.payload?.uid + currentUser?.uid
            };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    
    return(
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}