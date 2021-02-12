const continentSelect = document.getElementById('continent-select');
const countriesList = document.getElementById('countries-list');

const API_URL = 'https://countries.trevorblades.com/';

const fetchQuery = async (query, variables) => {
  const response = await fetch(API_URL, {
    method: 'POST', // why use post...?
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables
    })
  });
  return response.json();
};

const getContinents = async () => {
  const query = `
    query {
      continents {
        code
        name
      }
    }    
  `;
  const fetched = await fetchQuery(query);
  const continents = fetched.data.continents;
  continents.forEach(continent => {
    const option = document.createElement('option');
    option.value = continent.code;
    option.innerText = continent.name;
    continentSelect.appendChild(option);
  });
};

const getCountries = async e => {
  const code = e.target.value;
  const query = `
    query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
    }
  `;
  const fetched = await fetchQuery(query, { code });
  const countries = fetched.data.continent.countries;
  countriesList.innerHTML = '';
  countries.forEach(country => {
    const countryItem = document.createElement('li');
    countryItem.innerText = country.name;
    countriesList.appendChild(countryItem);
  });
};

continentSelect.addEventListener("change", getCountries);

const init = () => getContinents();

init();
