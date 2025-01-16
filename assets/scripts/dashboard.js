import { authHandler } from "./utils/authorization.js";
import { getData } from "./utils/httpRequest.js";
import { getCookie } from "./utils/cookie.js";

document.addEventListener("DOMContentLoaded", authHandler);
const usersList = document.querySelector(".users-list");

const logoutHandler = (e) => {
  document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  location.assign("./index.html");
};

const logoutBtn = document.getElementById("logout-button");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutHandler);
}

const getUsers = async () => {
  const users = await getData("users");
  return users;
};

const createUser = (user) => {
  const { id, name, address, phone, username, email } = user;
  const JSx = `
    <li>
          <div class="userId">${id}</div>
          <div class="name item">
            <div><i class="fa-solid fa-user"></i> Name:</div>
            <div>${name.firstname} ${name.lastname}</div>
          </div>
          <div class="username item">
            <div><i class="fa-regular fa-circle-user"></i> Username:</div>
            <div>${username}</div>
          </div>
          <div class="email item">
            <div><i class="fa-solid fa-envelope"></i> Email:</div>
            <div>${email}</div>
          </div>
          <div class="phone item">
            <div><i class="fa-solid fa-phone"></i> Phone:</div>
            <div>${phone}</div>
          </div>
          <div class="address item">
            <div><i class="fa-solid fa-map-location-dot"></i> Address:</div>
            <div> ${address.number} ${address.street}, ${address.city}</div>
          </div>
    </li>
  `;
  return JSx;
};

const renderUsers = async function () {
  usersList.innerHTML = "";
  const users = await getUsers();
  console.log(users);
  let userJSx = "";
  let username = getCookie("username");
  for (let user of users) {
    if (user.username === username) userJSx = createUser(user);
  }
  usersList.innerHTML += userJSx;
};
renderUsers();
export { logoutHandler };
