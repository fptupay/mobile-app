export const extractDateStringFromCurrentDate = (date: Date) => {
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

  const dateString = `${year}-${month}-${day}`

  return dateString
}

export const getCurrentYearTime = () => {
  const startDate = new Date(new Date().getFullYear(), 0, 2)
  const startDateString = startDate.toISOString().substring(0, 10)

  return startDateString
}

export const convertDateFormat = (inputDate: string) => {
  const parts = inputDate.split('-')
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`
  return formattedDate
}

export const convertDateFormatToISO = (inputDate: string) => {
  const parts = inputDate.split('/')
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`
  return formattedDate
}
