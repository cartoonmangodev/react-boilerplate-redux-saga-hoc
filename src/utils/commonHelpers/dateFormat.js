export function formatDate(date, showDate = true, shortMonth = false) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const newDate = new Date(date);
  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();
  const monthToDisplay = shortMonth
    ? months[monthIndex]
    : months[monthIndex] && months[monthIndex].substring(0, 3);
  const dayToDisplay = showDate ? day : '';
  return date ? `${dayToDisplay} ${monthToDisplay} ${year}` : date;
}

export const getDate = date => {
  const day = new Date(date);
  let dd = day.getDate();

  let mm = day.getMonth() + 1;
  const yyyy = day.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}-${mm}-${dd}`;
};
