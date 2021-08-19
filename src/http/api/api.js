import axios from 'axios'

const baseUrl = 'https://backend-front-test.dev.echo-company.ru/api'

export const authorization = async (phone, password) => {
  const response = await axios.post(`${baseUrl}/auth/login/`, {
    phone,
    password
  })
  return response
}

export const register = async (firstName,lastName,password,phone) => {
  const response = await axios.post(`${baseUrl}/user/registration/`, {
    first_name:firstName,
    last_name:lastName,
    phone,
    password
  })
  return response
}

export const passwordResetRequest = async (phone) => {
  const response = await axios.post(`${baseUrl}/user/forgot-start`,{
    phone
  })
  return response
}

export const passwordResetConfirm = async (phone,code,password) => {
  const response = await axios.post(`${baseUrl}/user/forgot-end`,{
    phone,
    code,
    password
  })
  return response
}

export const getUserInfo = async (token) => {
  const response = await axios.get(`${baseUrl}/user`,{
      headers:{
        'Authorization': token
      }
  })

  return response
}
