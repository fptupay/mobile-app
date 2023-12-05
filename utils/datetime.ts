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

export const getTransactionDates = (period: string) => {
  const today = new Date()
  const utcOffset = 7 // UTC+7

  let fromDate, toDate

  switch (period) {
    case 'this_week':
      fromDate = new Date(today)
      fromDate.setHours(0, 0, 0, 0)
      toDate = new Date(today)
      toDate.setDate(today.getDate() + (7 - today.getDay()))
      toDate.setHours(23, 59, 59, 999)
      break
    case 'last_week':
      fromDate = new Date(today)
      fromDate.setDate(today.getDate() - today.getDay() - 7)
      fromDate.setHours(0, 0, 0, 0)
      toDate = new Date(today)
      toDate.setDate(today.getDate() - today.getDay() - 1)
      toDate.setHours(23, 59, 59, 999)
      break
    case 'this_month':
      fromDate = new Date(today.getFullYear(), today.getMonth(), 1)
      toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      toDate.setHours(23, 59, 59, 999)
      break
    case 'last_month':
      fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      toDate = new Date(today.getFullYear(), today.getMonth(), 0)
      toDate.setHours(23, 59, 59, 999)
      break
    case 'last_3_months':
      fromDate = new Date(today)
      fromDate.setMonth(today.getMonth() - 2)
      fromDate.setDate(1)
      fromDate.setHours(0, 0, 0, 0)
      toDate = new Date(today)
      toDate.setHours(23, 59, 59, 999)
      break
    case 'this_year':
      fromDate = new Date(today.getFullYear(), 0, 1)
      toDate = new Date(today.getFullYear(), 11, 31)
      toDate.setHours(23, 59, 59, 999)
      break
    default:
      fromDate = new Date(today)
      fromDate.setMonth(today.getMonth() - 2)
      fromDate.setDate(1)
      fromDate.setHours(0, 0, 0, 0)
      toDate = new Date(today)
      toDate.setHours(23, 59, 59, 999)
      break
  }

  // Adjust dates to UTC+7
  fromDate?.setHours(fromDate.getHours() + utcOffset)
  toDate?.setHours(toDate.getHours() + utcOffset)

  const formattedFromDate = fromDate?.toISOString().substring(0, 10)
  const formattedToDate = toDate?.toISOString().substring(0, 10)

  return { from_date: formattedFromDate, to_date: formattedToDate }
}
