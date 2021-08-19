import React from 'react'
import './User.css'
import UserInfo from '../../components/UserInfo/UserInfo'


const User = () => {
  return (
    <div className='user'>
      <div className='user-wraper'>
        <UserInfo/>
      </div>
    </div>
  )
}

export default User
