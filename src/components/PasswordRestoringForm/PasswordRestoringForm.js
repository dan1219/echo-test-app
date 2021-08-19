import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import './PasswordRestoringForm.css'
import {Link} from 'react-router-dom'
import {passwordResetRequest,passwordResetConfirm} from '../../http/api/api'
import * as classNames from 'classnames'
import MaskedInput from 'react-text-mask'
import {parsePhoneNumber} from '../../utils/parsing'
import {isFieldEmpty, isFieldLengthError} from '../../validation/validation'



const PasswordRestoringForm = () => {
  const history = useHistory()
  const InitialSecondsForNewCode = 20
  const [secondsRemaining,setSecondsRemaining] = useState(InitialSecondsForNewCode)
  const [codeWasSent,setCodeWasSent] = useState(false)
  const [checkingCodeFormShow,setCheckingFormCodeShow] = useState(false)
  const [phoneNumber,setPhoneNumber] = useState('')
  const [code,setCode] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [title,setTitle] = useState('Восстановление пароля')
  const [titleSuccess,setTitleSuccess] = useState(false)
  const [titleError,setTitleError] = useState(false)

  const [codeError,setCodeError] = useState({errorMessage: '', state: false})
  const [newPasswordError, setNewPasswordError] = useState({errorMessage: '', state: false})
  const [phoneError, setPhoneError] = useState({errorMessage: '', state: false})

  const buttonCheckCodeHandleClick = () => {
    const phoneNum = parsePhoneNumber(phoneNumber)
    const codeErr = isFieldEmpty(code, setCodeError)

    const minPasswordLength = 8
    const maxPasswordLength = 15
    const newPasswordEr = isFieldEmpty(newPassword, setNewPasswordError) || isFieldLengthError(newPassword, minPasswordLength, maxPasswordLength, setNewPasswordError)

    if (codeErr || newPasswordEr)
      return

    passwordResetConfirm(phoneNum,code,newPassword)
    .then(res => {
      setTitleSuccess(true)
      setTitleError(false)
      setTitle('Пароль изменен')
      setTimeout(() => {
        history.push('/auth')
      }, 1000)
    })
    .catch(err => {
      setTitleError(true)
      setTitleSuccess(false)
      setTitle('Неверный код')
      console.log(err.response);
    })
  }

  const passwordInputHandleChange = (e) => {
    setNewPassword(e.target.value)
  }

  const phoneNumberInputHandleChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  const codeInputHandleChange = (e) => {
    setCode(e.target.value)
  }

  const codeButtonHandleClick = () => {
  const phoneNum = parsePhoneNumber(phoneNumber)
  const phoneEr = isFieldLengthError(phoneNum,11,11,setPhoneError)

  if (phoneEr)
    return

  passwordResetRequest(phoneNum)
  .then(res => {
    console.log(res);
    setCodeWasSent(true)
    setCheckingFormCodeShow(true)
    setSecondsRemaining(InitialSecondsForNewCode)
    let timerId = setInterval(() => {
      setSecondsRemaining((prevTime) => {
        let nextTime = prevTime - 1
        if (nextTime == 0) {
          clearInterval(timerId)
          setCodeWasSent(false)
        }
        return nextTime
      })
    }, 1000);
  })
  .catch(err => {
    console.log(err.response);
  })

  }

  const restoringFormTitleClass = classNames({
    'restoring-form__title':true,
    'restoring-form__title-success':titleSuccess,
    'restoring-form__title-error':titleError
  })

  const restoringFormPhoneInputClass = classNames({
    'restoring-form__phone_input':true,
    'error-field':phoneError.state
  })

  const restoringFormCodeInputClass = classNames({
    'restoring-form__code-input':true,
    'error-field':codeError.state
  })

  const restoringFormPasswordInputClass= classNames({
    'restoring-form__password-input':true,
    'error-field':newPasswordError.state
  })



  return (
    <form className='restoring-form'>
          <h1 className={restoringFormTitleClass}>{title}</h1>
            {
              checkingCodeFormShow
              ?
              (
                <>
                <div className='restoring-form__code'>
                  <label className='restoring-form__code-label'htmlFor='sms_code'>Введите код из смс</label>
                  <input
                    onChange={codeInputHandleChange}
                    value={code}
                    className={restoringFormCodeInputClass}
                    type='text'
                    placeholder='Код'
                    id='sms_code'
                  />
                {codeError.state && (<div className='error-text'>{codeError.errorMessage}</div>)}
                </div>
                <div className='restoring-form__password'>
                  <label className='restoring-form__password-label' htmlFor='new_password'>Введите новый пароль</label>
                  <input
                    onChange={passwordInputHandleChange}
                    value={newPassword}
                    className={restoringFormPasswordInputClass}
                    type='password'
                    placeholder='Пароль'
                    id='new_password'
                  />
                {newPasswordError.state && (<div className='error-text'>{newPasswordError.errorMessage}</div>)}
                </div>
                <a onClick={buttonCheckCodeHandleClick} className='restoring-form__button' href='#'>Изменить пароль</a>
                <div className='restoring-form__links'>
                  <a onClick={()=>{setCheckingFormCodeShow(false)}} className='restoring-form__link'>Изменить номер телефона</a>
                </div>

                </>
              )
              :
              (
                <>
                <div className='restoring-form__phone'>
                  <label className='restoring-form__phone-label' htmlFor='auth_phone'>Номер телефона</label>
                    <MaskedInput
                      mask={[/\d/,'(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                      onChange={phoneNumberInputHandleChange}
                      value={phoneNumber}
                      className={restoringFormPhoneInputClass}
                      placeholder='Номер телефона'
                      id='auth_phone'
                    />
                  {phoneError.state && (<div className='error-text'>{phoneError.errorMessage}</div>)}
                </div>


                {codeWasSent
                  ? (<div>Повторно отправить код можно через {secondsRemaining}</div>)
                  : (<a onClick={codeButtonHandleClick} className='restoring-form__button' href='#'>Отправить код</a>)}
                  <div className='restoring-form__links'>
                    <Link to='/auth' className='restoring-form__link' href='#'>Вспомнил пароль!</Link>
                    <Link to='/registration' className='restoring-form__registration-link' href='#'>Регистрация</Link>
                  </div>
                </>
              )
            }
    </form>
  )
}

export default PasswordRestoringForm
