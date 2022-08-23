import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.inputField.addEventListener(
  'input',
  debounce(() => {
    fetchCountries(refs.inputField.value.trim())
      .then(response => {
        if (response.length === 1) {
          refs.countryList.innerHTML = '';
          renderCountry(response);
        } else {
          refs.countryInfo.innerHTML = '';
          renderCountryList(response);
        }
      })
      .catch((error) => {
        // refs.countryList.innerHTML = '';
        // refs.countryInfo.innerHTML = '';
        console.log(error)
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countryList) {
  let markup = '';
  markup = countryList
    .map(
      country =>
        `<li class = "country-list__item"><img src = "${country.flags.svg}" alt = "Флаг страны ${country.name.official}" />${country.name.official}</li>`
    )
    .join('');
  refs.countryList.innerHTML = markup;
}

function renderCountry(countryList) {
  let languages = [];
  for (language in countryList[0].languages) {
    languages.push(countryList[0].languages[language]);
  }
  let markup = `<h1><img src = "${countryList[0].flags.svg}" alt = "Флаг страны ${countryList[0].name.official}" /> ${countryList[0].name.official}</h1>
  <ul>
  <li><b>Capital:</b> ${countryList[0].capital}</li>
  <li><b>Population:</b> ${countryList[0].population}</li>
  <li><b>Languages:</b> ${languages.join(', ')}</li>  
  </ul>`;
  refs.countryInfo.innerHTML = markup;
}
