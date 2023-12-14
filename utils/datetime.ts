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
  let fromDate = ''
  let toDate = ''
  const today = new Date()
  switch (period) {
    case 'this_week':
      fromDate = formatDate(
        new Date(today.setDate(today.getDate() - today.getDay() + 1))
      )
      toDate = formatDate(
        new Date(today.setDate(today.getDate() - today.getDay() + 7))
      )
      break
    case 'this_month':
      fromDate = formatDate(new Date(today.getFullYear(), today.getMonth(), 1))
      toDate = formatDate(
        new Date(today.getFullYear(), today.getMonth() + 1, 0)
      )
      break
    case 'last_month':
      fromDate = formatDate(
        new Date(today.getFullYear(), today.getMonth() - 1, 1)
      )
      toDate = formatDate(new Date(today.getFullYear(), today.getMonth(), 0))
      break
    case 'last_3_months':
      fromDate = formatDate(
        new Date(today.getFullYear(), today.getMonth() - 2, 1)
      )
      toDate = formatDate(
        new Date(today.getFullYear(), today.getMonth() + 1, 0)
      )
      break
    case 'this_year':
      fromDate = formatDate(new Date(today.getFullYear(), 0, 1))
      toDate = formatDate(new Date(today.getFullYear(), 11, 31))
      break
    default:
      fromDate = formatDate(new Date(today.getFullYear(), today.getMonth(), 1))
      toDate = formatDate(
        new Date(today.getFullYear(), today.getMonth() + 1, 0)
      )
      break
  }
  return { fromDate, toDate }
}

const formatDate = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`
}

export const getFirstAndLastDayOfCurrentMonth = () => {
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return {
    firstDay: formatDate(firstDay),
    lastDay: formatDate(lastDay)
  }
}

export const convertDateFormatToISO = (inputDate: string) => {
  const parts = inputDate.split('/')
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`
  return formattedDate
}
