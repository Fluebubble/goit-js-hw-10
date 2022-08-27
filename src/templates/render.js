import oneCountryTemplate from '../templates/oneCountryTemplate.hbs';
import countryListTemplate from '../templates/countryListTemplate.hbs';

export function renderCountryList(countryList) {
  let markup = '';
  markup = countryListTemplate(countryList);
  console.log(markup);
  return markup;
}

export function renderCountry(countryList) {
  let languages = [];
  for (let language in countryList[0].languages) {
    languages.push(countryList[0].languages[language]);
  }
  languages = languages.join(', ');
  let markup = oneCountryTemplate(countryList);
  return markup;
}
