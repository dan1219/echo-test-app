import React, {useState,useEffect} from 'react'
import './AuthorizationForm.css'
import {Link} from 'react-router-dom'
import {authorization} from '../../http/api/api'
import {isFieldEmpty, isFieldLengthError} from '../../validation/validation'
import * as classNames from 'classnames'
import {useDispatch} from 'react-redux';
import {logIn} from '../../App/appSlice';
import MaskedInput from 'react-text-mask'
import {parsePhoneNumber} from '../../utils/parsing'


const AuthorizationForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('Авторизация')
  const [authError, setAuthError] = useState(false)
  const [passwordFieldView, setPasswordFieldView] = useState(false)
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [passwordError, setPasswordError] = useState({errorMessage: '', state: false})
  const [phoneError, setPhoneError] = useState({errorMessage: '', state: false})
  const [checked, setChecked] = useState(false)

  useEffect(()=>{
    const userData = localStorage.getItem('userData')

    const userPhone = localStorage.getItem('userPhone')
    const userPassword = localStorage.getItem('userPassword')
    const userRemember = localStorage.getItem('userRemember')
    if (userPhone && userPassword && userRemember){
      setPhone(userPhone)
      setPassword(userPassword)
      setChecked(userRemember)
    }
  },[])

  const sendAuthRequest = () => {

    const minPasswordLength = 8
    const maxPasswordLength = 15
    const passwordEr = isFieldEmpty(password, setPasswordError) || isFieldLengthError(password, minPasswordLength, maxPasswordLength, setPasswordError)

    const phoneNum = parsePhoneNumber(phone)
    const phoneEr = isFieldEmpty(phoneNum, setPhoneError) || isFieldLengthError(phoneNum,11,11,setPhoneError)

    if (passwordEr || phoneEr)
      return

    authorization(phoneNum, password).then(res => {
      console.log(res);
      setAuthError(false)
      setTitle('Авторизация')
      const token = res.data.token
      localStorage.setItem('token', token);
      if (checked){
        localStorage.setItem('userPhone',phone)
        localStorage.setItem('userPassword',password)
        localStorage.setItem('userRemember',checked)
      }else{
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userPassword');
        localStorage.removeItem('userRemember');
      }
      dispatch(logIn())
    }).catch(err => {
      setTitle('Пользователя с такими данными не существует')
      setAuthError(true)
      console.log(err);
    })
  }

  const checkBoxHandleChange = () => {
    setChecked(prevChecked=>!prevChecked)
  }

  const inputHandleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendAuthRequest()
    }
  }
  const buttonAuthHandleClick = () => {
    sendAuthRequest()
  }

  const authFormPhoneInputClass = classNames({
    'authorization-form__phone_input':true,
    'error-field':phoneError.state
  })

  const authFormPasswordInputClass = classNames({
    'authorization-form__password-input':true,
    'error-field':passwordError.state
  })

  const passwordIconClass = classNames({
    'password-control':true,
    'view': passwordFieldView
  })

  const authFormTitleClass= classNames({
    'authorization-form__title':true,
    'authorization-form__title--error':authError
  })

  return (
    <form className='authorization-form'>
          <h1 className={authFormTitleClass}>{title}</h1>
          <div className='authorization-form__phone'>
            <label className='authorization-form__phone-label' htmlFor='auth_phone'>Номер телефона</label>
            <MaskedInput
              mask={[/\d/,'(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              onKeyPress={inputHandleKeyPress}
              onChange={e => setPhone(e.target.value)}
              value={phone}
              className={authFormPhoneInputClass}
              placeholder='Номер телефона'
              id='auth_phone'
            />
          {phoneError.state && (<div className='error-text'>{phoneError.errorMessage}</div>)}
          </div>
          <div className='authorization-form__password'>
            <label className='authorization-form__password-label'htmlFor='auth_password'>Пароль</label>
            <div className='password-wrapper'>
              <input
              onChange={e => setPassword(e.target.value)}
              onKeyPress={inputHandleKeyPress}
              value={password}
              className={authFormPasswordInputClass}
              type={passwordFieldView ? 'text' : 'password'}
              placeholder='Пароль'
              id='auth_password'
              />
            <a onClick={()=>setPasswordFieldView(!passwordFieldView)} href="#" class={passwordIconClass}></a>
            </div>
          {passwordError.state && (<div className='error-text'>{passwordError.errorMessage}</div>)}
          </div>
          <a onClick={buttonAuthHandleClick} className='authorization-form__button authorization-form__auth-button' href='#'>Войти</a>

          <div className='authorization-form__checkbox'>
              <label className='authorization-form__checkbox-label' htmlFor='remember_checkbox'>Запомнить меня</label>
              <div className='authorization-form__remember-checkbox'>
                <input onChange={checkBoxHandleChange} type='checkbox' id='remember_checkbox' checked={checked}/>
              </div>
          </div>

          <div className='authorization-form__links'>
            <Link to='/restoring' className=' authorization-form__forgot-link' href='#'>Забыли пароль?</Link>
            <Link to='/registration' className='authorization-form__registration-link' href='#'>Регистрация</Link>

          </div>

    </form>
  )
}

export default AuthorizationForm
