const BASE_URL = "https://fakestoreapi.com/";

async function getData(endpoint, header) {
  try {
    let url = BASE_URL + endpoint;
    let data = "";
    console.log(url);
    data = header ? await fetch(url, header) : await fetch(url);
    let json = await data.json();
    return json;
  } catch (error) {
    alert(error);
  }
}

export { getData };
