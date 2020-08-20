export function formatDate(date, showDate, shortMonth) {
  if (showDate === void 0) {
    showDate = true;
  }

  if (shortMonth === void 0) {
    shortMonth = false;
  }

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var newDate = new Date(date);
  var day = newDate.getDate();
  var monthIndex = newDate.getMonth();
  var year = newDate.getFullYear();
  var monthToDisplay = shortMonth ? months[monthIndex] : months[monthIndex] && months[monthIndex].substring(0, 3);
  var dayToDisplay = showDate ? day : '';
  return date ? dayToDisplay + " " + monthToDisplay + " " + year : date;
}
export var getDate = function getDate(date) {
  var day = new Date(date);
  var dd = day.getDate();
  var mm = day.getMonth() + 1;
  var yyyy = day.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  return yyyy + "-" + mm + "-" + dd;
};