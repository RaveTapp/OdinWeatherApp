async function getWeather(city) {
  const data = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=e618faa4130e48c486f54242240507&q=" +
      city,
    { mode: "cors" }
  );
  const dataJSON = await data.json();
  return dataJSON;
}

getWeather("maribor").then((data) => console.log(extractData(data)));

function extractData(json){
    const temp = json.current.temp_c;
    const city = json.location.name;
    const country = json.location.country;
    //console.log(json);

    return {temp, city, country};
}

