import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { renderCountry, renderCountryList } from './templates/render';

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.inputField.addEventListener('input', debounce(fetchByCountryName, DEBOUNCE_DELAY));

function fetchByCountryName(event) {
  console.log(event.target.value);
  if (event.target.value.trim().length === 0) {
    return;
  } else {
    fetchCountries(event.target.value.trim())
      .then(response => {
        if (response.length === 1) {
          refs.countryList.innerHTML = '';
          refs.countryInfo.innerHTML = renderCountry(response);
        } else if (response.length > 10) {
          refs.countryList.innerHTML = '';
          refs.countryInfo.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          refs.countryInfo.innerHTML = '';
          refs.countryList.innerHTML = renderCountryList(response);
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}
