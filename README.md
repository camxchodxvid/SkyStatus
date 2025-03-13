# SkyStatus

## Description

SkyStatus is a responsive weather dashboard that allows users to search for cities and view current weather conditions along with a 5-day forecast. The application presents the city name, date, weather icon, temperature, humidity, and wind speed for both current and future conditions. Each searched city is added to a persistent search history, allowing users to quickly access previously viewed weather data with a single click.

Built with modern web technologies and powered by the OpenWeather API, SkyStatus delivers accurate and up-to-date weather information in a clean, intuitive interface.

## Features

- **City Search**: Search for any city worldwide to view its weather data
- **Current Weather**: Display of current temperature, humidity, wind speed, and weather conditions with descriptive icons
- **5-Day Forecast**: Extended outlook showing weather trends for the upcoming five days
- **Search History**: Persistent storage of previously searched cities for quick access
- **Responsive Design**: Optimized for both desktop and mobile devices

## Screenshot

![SkyStatus Dashboard](./assets/images/screenshot.png)

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeather API
- Local Storage
- Server-side data storage with unique IDs
- Responsive design principles

## Deployment

The application is deployed and can be accessed at: [SkyStatus Live Site](https://skystatus.onrender.com/)

## Installation and Usage

To run this application locally:

1. Clone the repository:
   ```
   git clone https://github.com/camxchodxvid/SkyStatus.git
   ```

2. Navigate to the project directory:
   ```
   cd SkyStatus
   ```

3. Open the `index.html` file in your preferred browser.

4. Enter a city name in the search bar and click the search button to view weather information.

5. Click on any city in the search history to quickly view its weather data again.

## API Key Setup

This application requires an API key from OpenWeather:

1. Sign up for a free API key at [OpenWeather](https://openweathermap.org/api)
2. Create a `config.js` file in the project's root directory
3. Add your API key to the file:
   ```javascript
   const API_KEY = 'your_api_key_here';
   export { API_KEY };
   ```
4. Make sure to add `config.js` to your `.gitignore` file to keep your API key secure

## Server-Side Storage

The application stores searched cities with unique IDs in a JSON file on the server. This enables persistent data storage across different user sessions and devices.

## Future Enhancements

- Add geolocation to automatically display the user's local weather
- Implement weather alerts and notifications
- Add additional weather metrics like air quality and UV index
- Create toggles for temperature units (Fahrenheit/Celsius)
- Integrate weather maps and radar imagery

## Contributing

Contributions to improve SkyStatus are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

David - [dxid2001@gmail.com](mailto:dxid2001@gmail.com)

Project Link: [https://github.com/camxchodxvid/SkyStatus.git](https://github.com/camxchodxvid/SkyStatus.git)
