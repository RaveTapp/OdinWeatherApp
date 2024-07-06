import "./styles.css"

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
    console.log(error.message);
  }
}

function extractData(json) {
  const temp = json.current.temp_c;
  const weatherText = json.current.condition.text;
  const city = json.location.name;
  const country = json.location.country;
  //console.log(json);

  return { temp, weatherText, city, country };
}

const inputForm = document.querySelector(".input form");
const input = inputForm.querySelector("#city");

/*const inputSubmit = document.querySelector(".input form [type='submit']");
inputSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  const city = inputForm.querySelector("#city");
  getWeather(city.value).then((data) => {
    if(data){
      console.log(extractData(data));
    }
    
  });
});*/

function formSubmit() {
  if(input.value != ""){//Če je krajše kot 3 črke je error
    getWeather(input.value).then((data) => {
      if(data){
        console.log(extractData(data));
      }
    });
  }
}


input.addEventListener("blur", formSubmit);

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formSubmit();
});