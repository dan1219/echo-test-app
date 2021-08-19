import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './UserInfo.css'
import {useDispatch,useSelector } from 'react-redux';
import {logOut} from '../../App/appSlice';
import {getUserInfo} from '../../http/api/api'



const UserInfo = () => {
  const dispatch = useDispatch()
  const [userName,setUserName] = useState('')
  useEffect(()=>{
    const token=localStorage.getItem('token')
    getUserInfo(token)
    .then(res => {
      const currentUserName = res.data.first_name
      setUserName(currentUserName)
      console.log(res);
    })
    .catch(err => {
      console.log(err.response);
    })
  })

  const logoutButtonHandleClick = () => {
    localStorage.removeItem('token');
    dispatch(logOut())
  }
  return (
    <div className='user-info'>
      <h1 className='user-info__title'>Здравствуйте, {userName}</h1>
      <a className='user-info__logout-button' href='#' onClick={logoutButtonHandleClick}>Выйти</a>
    </div>
  )
}

export default UserInfo
