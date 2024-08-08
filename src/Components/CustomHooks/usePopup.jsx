import React, { useState } from 'react'

const usePopup = () => {
    const [popup, setPopup] = useState(initialStateValue)
    setPopup(prevState => !prevState)
  return (
    {popup}
  )
}

export default usePopup
