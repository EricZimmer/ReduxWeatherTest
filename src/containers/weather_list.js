import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';


class WeatherList extends Component {

  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => {
      return Math.floor(weather.main.temp * 9/5 -459.67 + 0.5)}); 
      // convert Kelvin to Farenheit and add 0.5 so floor rounds properly
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={lon} /></td>
        <td>
          <Chart data={temps} color="orange" />
        </td>
        <td>
          <Chart data={pressures} color="red" />
        </td>
        <td>
          <Chart data={humidities} color="blue" />
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