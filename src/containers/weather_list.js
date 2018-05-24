import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';


class WeatherList extends Component {

  renderWeather(cityData) {
    
    const weatherObj = {
      name: cityData.city.name,
      temps: [],
      humidities: [],
      pressures: [],
      coords: {
        lon: cityData.city.coord.lon,
        lat: cityData.city.coord.lat
      }
    }

    cityData.list.map(weather => {
      weatherObj.temps.push(Math.floor(weather.main.temp * 9/5 -459.67 + 0.5));
      weatherObj.humidities.push(weather.main.humidity);
      weatherObj.pressures.push(weather.main.pressure);
    });

    /* const temps = cityData.list.map(weather => {
      return Math.floor(weather.main.temp * 9/5 -459.67 + 0.5)}); 
      // convert Kelvin to Farenheit and add 0.5 so floor rounds properly
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity); 
    const { lon, lat } = cityData.city.coord;*/
    const condition = cityData.list.map(weather => weather.weather[0].description);
    
    console.log(weatherObj);

    return (
      <tr key={weatherObj.name}>
        <td><GoogleMap lat={weatherObj.coords.lat} lon={weatherObj.coords.lon} /></td>
        <td>
          <Chart data={weatherObj.temps} color="orange" />
        </td>
        <td>
          <Chart data={weatherObj.pressures} color="red" />
        </td>
        <td>
          <Chart data={weatherObj.humidities} color="blue" />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) { // es6 deconstructed state.weather
  return { weather }; // { weather } === { weather: state.weather }
}

export default connect(mapStateToProps)(WeatherList);