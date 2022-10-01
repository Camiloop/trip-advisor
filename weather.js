// const { default: axios } = require("axios");

const weatherApp = async (city) => {
  const apiKey = '9f4409f81f67d5e4c9fc69aef96d6494';

  try {
    const geoCoding = await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    const lat = geoCoding.data[4].lat
    const lon = geoCoding.data[4].lon

    const weather = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)

    let name = geoCoding.data[4].name;
    let temp = weather.data.main.temp;
    let icon = weather.data.weather[0].icon
    let description = weather.data.weather[0].description
    // console.log(description)

    document.getElementById('weather__city').innerHTML = `Weather in ${name}`
    document.getElementById('weather__temp').innerHTML = temp + ' °C'
    document.getElementById('weather__icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.getElementById('weather__description').innerHTML = description;

  } catch(err) {
    console.log('Something went wrong :c')
    document.getElementById('weather__city').innerHTML = 'City not found!'
  }
}

const searchBar = document.querySelector('.search__bar')

let search = () => {
  searchBar.addEventListener('change', (e) => {
    const value = e.target.value
    weatherApp(value)
  })
}

document.querySelector('#search__button').addEventListener('click', search())
document.querySelector('.search__bar').addEventListener('keyUp', () => {
  if (key == 'Enter') {
    search()
  }
})