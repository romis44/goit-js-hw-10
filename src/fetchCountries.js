export { fetchCountries };

const paramCountries = [
  'name',
  'capital',
  'population',
  'flags',
  'languages',
].join(',');

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${paramCountries}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
