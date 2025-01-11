

async function getData(baseUrl, endpoint) {
  let url = baseUrl + endpoint;
  let data = await fetch(url);
  let json = await data.json();
  return json;
}

export { getData };
