import React from 'react'
import "../FilterPopup/FilterPopup.css"
import { RxAvatar, RxGroup, RxHamburgerMenu, RxPencil1 } from 'react-icons/rx'

const FilterPopup = ({open}) => {
  return (
    <div>
     {
        open && 
        <div className='filter__container'>
            <p className='filter__header'>Filter chats by</p>
            <div className="filter__option">
              <RxHamburgerMenu className='filterpopup__icons'/>
              <p>Unread</p>
            </div>
            <div className="filter__option">
              <RxAvatar className='filterpopup__icons'/>
              <p>Contacts</p>
            </div>
            <div className="filter__option">
              <RxHamburgerMenu className='filterpopup__icons'/>
              <p>Non-contacts</p>
            </div>
            <div className="filter__option">
              <RxGroup className='filterpopup__icons'/>
              <p>Groups</p>
            </div>
            <div className="filter__option">
              <RxPencil1 className='filterpopup__icons'/>
              <p>Drafts</p>
            </div>

        </div>}
    </div>
  )
}

export default FilterPopup
