const today = new Date()

export const getCurrentDateInfo = () => ({
  today,
  currentMonth: today.getMonth(),
  currentPeriod: today.getFullYear(),
})
