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

const renderUserCart = async (id) => {
  const endpoint = `carts/user/${id}`;
  const cartData = await getData(endpoint);
  const cartId = cartData[0].id;
  let cartDate = new Date(cartData[0].date).toLocaleDateString();
  let JSx = `
        <li>
          <div class="userid">${cartId}</div>
          <div class="date item">${cartDate}</div>
  `;
  const products = cartData[0].products;
  for (let product of products) {
    const quantity = product.quantity;
    const productData = await getData(`products/${product.productId}`);
    const productName = productData.title;
    const productPrice = productData.price;
    JSx += `
            <div class="name item">
              <div>${productName}</div>
              <div>Price: $${productPrice}</div>
              <div>Qty: ${quantity}</div>
            </div>
      `;
  }
  JSx += `</li>`;
  return JSx;
};

const createUser = async (user) => {
  const { id, name, address, phone, username, email } = user;
  const JSx = `
      <li>
          <div class="userid">${id}</div>
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
      </li>`;
  const userCart = document.querySelector(".user-cart");
  const cartJSx = await renderUserCart(id);
  userCart.innerHTML += cartJSx;
  return JSx;
};

const renderUsers = async function () {
  usersList.innerHTML = "";
  const users = await getUsers();
  let userJSx = "";
  let username = getCookie("username");
  for (let user of users) {
    if (user.username === username) userJSx = await createUser(user);
  }
  usersList.innerHTML += userJSx;
};
renderUsers();
export { logoutHandler };
