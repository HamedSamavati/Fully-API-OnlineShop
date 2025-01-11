import { getData } from "./utils/validation.js";
const baseUrl = "https://fakestoreapi.com/";
const allProductsEndpoint = "products";
const cardsContainer = document.querySelector(".cards");
const categoryBtns = document.querySelectorAll(".category");
const searchInput = document.querySelector("input");
const loader = document.getElementById("loader");

function saveToLocalstorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("the key stored in LS successfully!");
  } catch (error) {
    console.error(error);
  }
}
function retrieveFromLocalStorage(key) {
  let data = localStorage.getItem(key);
  const result = JSON.parse(data);
  return result;
}

const createRating = (category, rate, count) => {
  return `
         <div>
            <div class="card__rate vote">
              <i class="fa-solid fa-star"></i>
              <p>${rate}</p>
            </div>
            <div class="card__voters vote">
              <i class="fa-solid fa-user"></i>
              <p>${count}</p>
            </div>
         </div>
    `;
};
const createImageTitlePrice = (image, title, price, id) => {
  return `
        <div>
            <img
              class="card__image"
              src=${image}
              alt="."
            />
        </div>
        <p class="card__title">${title}</p>
        <div class="card__price-button">
            <p class="card__price">$${price}</p>
            <button class="card__button" data-id=${id}>
              Buy <i class="fa-solid fa-basket-shopping"></i>
            </button>
        </div>
`;
};

const createCard = (item) => {
  const { id, description, category, image, price, rating, title } = item;
  const { count, rate } = rating;
  const card = document.createElement("div");
  card.innerHTML =
    createRating(category, rate, count) +
    createImageTitlePrice(image, title, price, id);
  card.classList.add("card");
  card.dataset.categoty = category;
  return card;
};

const creatCards = (data) => {
  cardsContainer.innerHTML = "";
  for (let item of data) {
    cardsContainer.appendChild(createCard(item));
  }
};

const loadItemsInCategory = async (category) => {
  cardsContainer.innerHTML = `<div id="loader"></div>`;
  if (category === "all") {
    renderPage();
    return;
  }
  let categoryEndpoint = "products/category/" + category;
  const data = await getData(baseUrl, categoryEndpoint);
  saveToLocalstorage("data", data);
  creatCards(data);
};

const categoryHandler = function (event) {
  let category = event.target.innerText;
  toggleActiveCategoryBtns(event.target);
  loadItemsInCategory(category.toLowerCase());
};

const addListenerToItems = (items, handler) => {
  items.forEach((item) => {
    item.addEventListener("click", handler);
  });
};

const toggleActiveCategoryBtns = (target) => {
  categoryBtns.forEach((btn) => btn.classList.remove("active"));
  target.classList.toggle("active");
  target.innerText;
};

const searchHandler = (e) => {
  console.log(e.target.value);
  let searchedItems = [];
  let data = retrieveFromLocalStorage("data");
  for (let i in data) {
    if (data[i].title.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchedItems.push(data[i]);
    }
  }
  creatCards(searchedItems);
};

const renderPage = async function () {
  cardsContainer.innerHTML = `<div id="loader"></div>`;
  const data = await getData(baseUrl, allProductsEndpoint);
  saveToLocalstorage("data", data);
  creatCards(data);
  console.log(data);
  addListenerToItems(categoryBtns, categoryHandler);
  searchInput.addEventListener("keyup", searchHandler);
};

renderPage();
