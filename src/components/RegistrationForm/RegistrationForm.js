import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './RegistrationForm.css'
import {Link} from 'react-router-dom'
import {register} from '../../http/api/api'
import {isFieldEmpty,isFieldLengthError} from '../../validation/validation'
import * as classNames from 'classnames'
import MaskedInput from 'react-text-mask'
import {parsePhoneNumber} from '../../utils/parsing'

const RegistrationForm = () => {
  const history = useHistory()
  const [title, setTitle] = useState('Регистрация')
  const [passwordFieldView,setPasswordFieldView] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [registerSuccess,setRegisterSuccess] = useState(false)

  const [firstNameError, setFirstNameError] = useState({errorMessage: '', state: false})
  const [lastNameError, setLastNameError] = useState({errorMessage: '', state: false})
  const [passwordError, setPasswordError] = useState({errorMessage: '', state: false})
  const [phoneError, setPhoneError] = useState({errorMessage: '', state: false})

  const sendRegRequest = () => {

    const minPasswordLength = 8
    const maxPasswordLength = 15
    const firstNameErr = isFieldEmpty(firstName,setFirstNameError)
    const lastNameErr = isFieldEmpty(lastName,setLastNameError)
    const passwordEr = isFieldEmpty(password,setPasswordError) || isFieldLengthError(password,minPasswordLength,maxPasswordLength,setPasswordError)

    const phoneNum = parsePhoneNumber(phone)
    const phoneEr = isFieldEmpty(phoneNum,setPhoneError) || isFieldLengthError(phoneNum,11,11,setPhoneError)

    if (firstNameErr || lastNameErr || passwordEr || phoneEr) return

    register(firstName, lastName, password, phoneNum)
    .then(res => {
      console.log(res);
      setRegisterSuccess(true)
      setTitle('Регистрация прошла успешно')
      setTimeout(() => {
        history.push('/auth')
      }, 1000)
    })
    .catch(err => {
      console.log(err.response);
    })
  }
  const inputHandleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendRegRequest()
    }
  }

  const buttonRegisterHandleClick = () => {
    sendRegRequest()
  }

  const regFormNameInputClass = classNames({
    'registration-form__name-input':true,
    'error-field':firstNameError.state
  })

  const regFormLastNameInputClass = classNames({
    'registration-form__lastname-input':true,
    'error-field':lastNameError.state
  })

  const regFormPhoneInputClass = classNames({
    'registration-form__phone_input':true,
    'error-field':phoneError.state
  })

  const regFormPasswordInputClass = classNames({
    'registration-form__password-input':true,
    'error-field':passwordError.state
  })

  const passwordIconClass = classNames({
    'password-control':true,
    'view': passwordFieldView
  })

  const registrationFormTitleClass = classNames({
    'registration-form__title':true,
    'registration-form__title-success':registerSuccess
  })


  return (
    <form className='registration-form'>
    <h1 className={registrationFormTitleClass}>{title}</h1>
    <div className='registration-form__name'>
      <label className='registration-form__name-label' htmlFor='reg_name'>Имя</label>
      <input
        onChange={e => setFirstName(e.target.value)}
        onKeyPress={inputHandleKeyPress}
        value={firstName}
        className={regFormNameInputClass}
        type='text'
        placeholder='Имя'
        id='reg_name'
      />
      {firstNameError.state && (<div className='error-text'>{firstNameError.errorMessage}</div>)}
    </div>

    <div className='registration-form__lastname'>
      <label className='registration-form__lastname-label' htmlFor='reg_lastname'>Фамилия</label>
      <input
        onChange={e => setLastName(e.target.value)}
        onKeyPress={inputHandleKeyPress}
        value={lastName}
        className={regFormLastNameInputClass}
        type='text'
        placeholder='Имя'
        id='reg_lastname'
      />
        {lastNameError.state && (<div className='error-text'>{lastNameError.errorMessage}</div>)}
    </div>


    <div className='registration-form__phone'>
      <label className='registration-form__phone-label' htmlFor='reg_phone'>Номер телефона</label>
      <MaskedInput
        mask={[/\d/,'(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        onKeyPress={inputHandleKeyPress}
        onChange={e => setPhone(e.target.value)}
        value={phone}
        className={regFormPhoneInputClass}
        placeholder='Номер телефона'
        id='reg_phone'
      />

      {phoneError.state && (<div className='error-text'>{phoneError.errorMessage}</div>)}
    </div>


    <div className='registration-form__password'>
      <label className='registration-form__password-label' htmlFor='reg_password'>Пароль</label>
      <div className='password-wrapper'>
      <input
        onChange={e => setPassword(e.target.value)}
        onKeyPress={inputHandleKeyPress}
        value={password}
        className={regFormPasswordInputClass}
        type={passwordFieldView ? 'text' : 'password'}
        placeholder='Пароль'
        id='reg_password'
      />
      <a onClick={()=>setPasswordFieldView(!passwordFieldView)}href="#" class={passwordIconClass}></a>
      </div>
      {passwordError.state && (<div className='error-text'>{passwordError.errorMessage}</div>)}
    </div>
    <a
      onClick={buttonRegisterHandleClick}
      className='registration-form__button registration-form__reg-button'
      href='#'>Зарегистрироваться
    </a>

    <div className='registration-form__links'>
      <Link to='/auth' className=' registration-form__auth-link' href='#'>Авторизация</Link>
    </div>

  </form>)
}

export default RegistrationForm
