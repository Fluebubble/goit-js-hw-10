const STATIC_ADDRESS = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(`${STATIC_ADDRESS}${name}?fields=name,population,languages,flags,capital`)
    .then(response => {
      if (!response.ok) {
        console.log(response);
      }
      return response.json();
    })
}
