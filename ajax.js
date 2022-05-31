const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(...data));

function showMatchedCities(matchedWord, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(matchedWord, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function handleInputValue() {
  const matchedArray = showMatchedCities(this.value, cities);
  const html = !this.value
    ? `<li class="no-item">No search items in the list!</li>`
    : matchedArray
        .map((place) => {
          const regex = new RegExp(this.value, "gi");
          const city = place.city.replace(
            regex,
            `<span class="highlight">${this.value}</span>`,
          );

          const state = place.state.replace(
            regex,
            `<span class="highlight">${this.value}</span>`,
          );
          return `<li>
        <span class="city-state">${city}, ${state}</span>
        <span class="population">${Number(place.population).toLocaleString(
          "en-US",
        )}</span>
        </li>`;
        })
        .join("");

  suggestions.innerHTML = html;
}

const inputForm = document.querySelector(".formInput");
const suggestions = document.querySelector(".suggestions");

inputForm.addEventListener("change", handleInputValue);
inputForm.addEventListener("keyup", handleInputValue);
