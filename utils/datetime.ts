export const extractDateStringFromCurrentDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const dateString = `${year}-${month}-${day}`

  return dateString
}

export const getCurrentYearTime = () => {
  const startDate = new Date(new Date().getFullYear(), 0, 2)
  const startDateString = startDate.toISOString().substring(0, 10)

  return startDateString
}
