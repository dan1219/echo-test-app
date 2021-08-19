export const parsePhoneNumber = (number) => {
  const resultPhoneNumber = number[0] + number.substr(2,3) + number.substr(7,3) + number.substr(11,4)
  for (let i=0;i<resultPhoneNumber.length;i++){
    const parsed = parseInt(resultPhoneNumber[i])
    if (isNaN(parsed))
      return '0'
  }
  return resultPhoneNumber
}
