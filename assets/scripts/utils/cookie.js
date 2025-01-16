const setCookie = (key, data) => {
  document.cookie = `${key}=${data}; max-age=${24 * 60 * 60}; path=/`;
  return;
};

const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    if (cookie.trim().startsWith(name + "=")) {
      return cookie.split("=")[1];
    }
  }
  return false;
};
export { setCookie, getCookie };
