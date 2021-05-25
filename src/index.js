
import fetchCountries from "./fetchCountries"
import countriesHbs from "./countriesHbs.hbs"
import countryHbs from "./countryHbs.hbs"
 import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';
defaults.styling = 'material';
defaults.delay = 1000;
import { alert, notice, info, success, error } from '@pnotify/core';
const elem = document.querySelector(".autocomplete");
const divElem = document.querySelector(".rezult-search");

const debounce = require('lodash.debounce');
elem.addEventListener("keyup", debounce(serch, 500));

function serch(event) {
  event.preventDefault();
  const serchText = elem.value.trim(); 
  if (serchText === '') {
    divElem.innerHTML = '';
    return;
  }
  fetchCountries(serchText).then(countries => {
    console.log(countries);
    divElem.innerHTML = '';
    if (countries.length > 10) {
      var massage = info({
        text: "Cдишком много результатов поиска пожалуста введие больше букв для уточния! "
      });
      return
    }
      if (countries.length > 1 && countries.length <= 10) {
          divElem.insertAdjacentHTML("afterbegin", countriesHbs(countries))
      }
      if (countries.length === 1) {
          divElem.insertAdjacentHTML("afterbegin", countryHbs(countries))
      }   
  })
}
