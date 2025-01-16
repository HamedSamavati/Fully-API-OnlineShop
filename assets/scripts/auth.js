import { getData } from "./utils/httpRequest.js";
import { setCookie } from "./utils/cookie.js";
import { authHandler } from "./utils/authorization.js";
import { validateForm } from "./utils/validation.js";

const endpoint = "auth/login";
const inputsBox = document.querySelectorAll("input");
const loginBtn = document.querySelector("button");

const loginHandler = async (event) => {
  event.preventDefault();
  let username = inputsBox[0].value;
  let password = inputsBox[1].value;
  setCookie("username", username);
  const validation = validateForm(username, password);
  if (!validation) return;
  let header = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  };
  const data = await getData(endpoint, header);
  setCookie("token", data.token);
  location.assign("index.html");
};

loginBtn.addEventListener("click", loginHandler);
document.addEventListener("DOMContentLoaded", authHandler);
