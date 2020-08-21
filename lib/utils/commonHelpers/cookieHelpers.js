/* eslint-disable no-plusplus */
export var setCookie = function setCookie(name, value) {
  document.cookie = name + "=" + value + "; Path=/;";
};
export var deleteCookie = function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
export var getCookie = function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};