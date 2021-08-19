import React from 'react'
import './Authorization.css'
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm'

const Authorization = () => {
  return (
    <div className='authorization'>
      <div className='auth-wrapper'>
        <AuthorizationForm/>
      </div>
    </div>
  )
}

export default Authorization
