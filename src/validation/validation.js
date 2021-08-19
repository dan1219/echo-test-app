export const isFieldEmpty = (text, setState) => {
  if (text) {
    setState({
      errorMessage: '',
      state: false
    })
    return false
  } else {
    setState({
      errorMessage: 'Поле не может быть пустым',
      state: true
    })
    return true
  }
}

export const isFieldLengthError = (text, minLength, maxLength, setState) => {
  if (text.length < minLength) {
    setState({
      errorMessage: `Длина текста должна быть не менее ${minLength} символов`,
      state: true
    })
    return true
  }

  if (text.length > maxLength) {
    setState({
      errorMessage: `Длина текста должна быть не более ${maxLength} символов`,
      state: true
    })
    return true
  }
  setState({
    errorMessage: ``,
    state: false
  })

  return false


}
