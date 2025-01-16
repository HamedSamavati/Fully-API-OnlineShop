import { getCookie } from "./cookie.js";

const authHandler = () => {
  const token = getCookie("token");
  const url = location.href;
  if (
    (!token && url.includes("dashboard")) ||
    (token && url.includes("auth"))
  ) {
    location.assign("index.html");
    return false;
  }
};

export { authHandler };
