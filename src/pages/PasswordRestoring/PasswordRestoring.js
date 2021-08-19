import React from 'react'
import './PasswordRestoring.css'
import PasswordRestoringForm from '../../components/PasswordRestoringForm/PasswordRestoringForm'

const PasswordRestoring = () => {
  return (
    <div className='password-restoring'>
      <div className='restore-wrapper'>
        <PasswordRestoringForm/>
      </div>
    </div>
  )
}

export default PasswordRestoring
