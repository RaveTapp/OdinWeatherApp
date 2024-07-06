import "./styles.css";

const errorElem = document.querySelector(".main .error");
const dataElem = document.querySelector(".main .data");
const inputForm = document.querySelector(".input form");
const input = inputForm.querySelector("#city");

async function getWeather(city) {
  try {
    const data = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=e618faa4130e48c486f54242240507&q=" +
        city,
      { mode: "cors" }
    );

    if (data.status !== 200) {
      throw new Error("Failed to get data");
    }
    const dataJSON = await data.json();
    return dataJSON;
  } catch (error) {
    errorElem.textContent = error.message;
  }
}

function extractData(json) {
  const temp = json.current.temp_c;
  const weatherText = json.current.condition.text;
  const city = json.location.name;
  const country = json.location.country;

  return { temp, weatherText, city, country };
}

function formSubmit() {
  if (input.value.length < 3) {
    errorElem.textContent = "At least 3 characters are needed to search.";
  } else {
    errorElem.textContent = "";
    getWeather(input.value).then((data) => {
      if (data) {
        const weatherData = extractData(data);
        dataElem.textContent = `${weatherData.weatherText} with ${weatherData.temp}°C in ${weatherData.city}, ${weatherData.country}`;
      }
    });
  }
}

input.addEventListener("blur", formSubmit);

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formSubmit();
});
