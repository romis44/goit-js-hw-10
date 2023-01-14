import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function cleanInput(evt) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  return;
}

function onSearch(evt) {
  if (!evt.target.value.trim()) {
    cleanInput();
    return;
  }

  return fetchCountries(evt.target.value.trim())
    .then(findCountries)
    .catch(onError);
}

function findCountries(countries) {
  if (countries.length > 10) {
    cleanInput();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countries.length >= 2 && countries.length <= 10) {
    cleanInput();
    countryList.innerHTML = countryListMarkup(countries);
    return;
  }
  cleanInput();
  countryInfo.innerHTML = countryInfoMarkup(countries);
}

function countryListMarkup(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li>
                    <img src="${flags.svg}" alt="${name.official}" width="30" height="20" />
                         <p>${name.official}</p>
                </li>`;
    })
    .join('');
}

function countryInfoMarkup(countries) {
  return countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<img src="${flags.svg}" alt=" ${name}" width="70" height="50" />
                <h1>${name}</h1>
                <p><span>Capital:</span> ${capital}</p>
                <p><span>Population:</span> ${population}</p>
                <p>
                    <span>Languages:</span> 
                    ${Object.values(languages).join(', ')}
                </p>`;
    })
    .join('');
}

function onError() {
  cleanInput();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
