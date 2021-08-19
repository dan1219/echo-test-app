import React from 'react'
import './Registration.css'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'


const Registration = () => {
  return (
    <div className='registration'>
        <div className='reg-wrapper'>
          <RegistrationForm/>
        </div>
    </div>
  )
}

export default Registration
