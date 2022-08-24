export function renderCountryList(countryList) {
  let markup = '';
  markup = countryList
    .map(
      country =>
        `<li class = "country-list__item"><img src = "${country.flags.svg}" alt = "Флаг страны ${country.name.official}" />${country.name.official}</li>`
    )
    .join('');
  return markup;
}

export function renderCountry(countryList) {
  let languages = [];
  for (language in countryList[0].languages) {
    languages.push(countryList[0].languages[language]);
  }
  languages = languages.join(', ');
  let markup = `<h1><img src = "${countryList[0].flags.svg}" alt = "Флаг страны ${countryList[0].name.official}" /> ${countryList[0].name.official}</h1>
    <ul>
    <li><b>Capital:</b> ${countryList[0].capital}</li>
    <li><b>Population:</b> ${countryList[0].population}</li>
    <li><b>Languages:</b> ${languages}</li>  
    </ul>`;
  return markup;
}
