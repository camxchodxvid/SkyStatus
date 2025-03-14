import './styles/jass.css';

// Type definitions for weather data
interface WeatherData {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
}

interface CityHistory {
  id: string;
  name: string;
}

// DOM element selections with better type safety
const elements = {
  searchForm: document.getElementById('search-form') as HTMLFormElement,
  searchInput: document.getElementById('search-input') as HTMLInputElement,
  todayContainer: document.querySelector('#today') as HTMLDivElement,
  forecastContainer: document.querySelector('#forecast') as HTMLDivElement,
  searchHistoryContainer: document.getElementById('history') as HTMLDivElement,
  heading: document.getElementById('search-title') as HTMLHeadingElement,
  weatherIcon: document.getElementById('weather-img') as HTMLImageElement,
  tempEl: document.getElementById('temp') as HTMLParagraphElement,
  windEl: document.getElementById('wind') as HTMLParagraphElement,
  humidityEl: document.getElementById('humidity') as HTMLParagraphElement,
};

/**
 * API Functions
 */

// Fetch weather data for a city
const fetchWeather = async (cityName: string): Promise<void> => {
  try {
    const response = await fetch('/api/weather/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityName }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    
    // First item is current weather, rest is forecast
    renderCurrentWeather(weatherData[0]);
    renderForecast(weatherData.slice(1));
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
};

// Get search history from API
const fetchSearchHistory = async (): Promise<Response> => {
  return fetch('/api/weather/history', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Remove a city from search history
const deleteCityFromHistory = async (id: string): Promise<void> => {
  try {
    await fetch(`/api/weather/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting city:', error);
  }
};

/**
 * Render Functions
 */

// Display current weather data
const renderCurrentWeather = (currentWeather: WeatherData): void => {
  const { city, date, icon, iconDescription, tempF, windSpeed, humidity } = currentWeather;
  
  // Update DOM elements with weather data
  elements.heading.textContent = `${city} (${date})`;
  
  elements.weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
  elements.weatherIcon.setAttribute('alt', iconDescription);
  elements.weatherIcon.setAttribute('class', 'weather-img');
  
  elements.heading.append(elements.weatherIcon);
  elements.tempEl.textContent = `Temp: ${tempF}°F`;
  elements.windEl.textContent = `Wind: ${windSpeed} MPH`;
  elements.humidityEl.textContent = `Humidity: ${humidity} %`;

  if (elements.todayContainer) {
    elements.todayContainer.innerHTML = '';
    elements.todayContainer.append(elements.heading, elements.tempEl, elements.windEl, elements.humidityEl);
  }
};

// Render the 5-day forecast
const renderForecast = (forecast: WeatherData[]): void => {
  if (!elements.forecastContainer) return;
  
  // Create heading for forecast section
  const headingCol = document.createElement('div');
  const heading = document.createElement('h4');
  
  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);
  
  // Clear and initialize forecast container
  elements.forecastContainer.innerHTML = '';
  elements.forecastContainer.append(headingCol);
  
  // Render each forecast day
  forecast.forEach(day => renderForecastCard(day));
};

// Create and render a forecast card for a single day
const renderForecastCard = (forecast: WeatherData): void => {
  const { date, icon, iconDescription, tempF, windSpeed, humidity } = forecast;
  
  // Create card elements
  const card = createForecastCard();
  
  // Populate card with data
  card.cardTitle.textContent = date;
  card.weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
  card.weatherIcon.setAttribute('alt', iconDescription);
  card.tempEl.textContent = `Temp: ${tempF} °F`;
  card.windEl.textContent = `Wind: ${windSpeed} MPH`;
  card.humidityEl.textContent = `Humidity: ${humidity} %`;
  
  // Add card to forecast container
  elements.forecastContainer?.append(card.col);
};

// Render the search history list
const renderSearchHistory = async (searchHistory: Response): Promise<void> => {
  if (!elements.searchHistoryContainer) return;
  
  try {
    const historyList: CityHistory[] = await searchHistory.json();
    
    // Clear history container
    elements.searchHistoryContainer.innerHTML = '';
    
    // Show message if no history
    if (historyList.length === 0) {
      elements.searchHistoryContainer.innerHTML = 
        '<p class="text-center">No Previous Search History</p>';
      return;
    }
    
    // Create and append history items in reverse order (newest first)
    for (let i = historyList.length - 1; i >= 0; i--) {
      const historyItem = buildHistoryListItem(historyList[i]);
      elements.searchHistoryContainer.append(historyItem);
    }
  } catch (error) {
    console.error('Error rendering search history:', error);
  }
};

/**
 * Helper Functions
 */

// Create elements for a forecast card
const createForecastCard = () => {
  const col = document.createElement('div');
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const weatherIcon = document.createElement('img');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');
  
  // Structure elements
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
  
  // Add classes
  col.classList.add('col-auto');
  card.classList.add('forecast-card', 'card', 'text-white', 'bg-primary', 'h-100');
  cardBody.classList.add('card-body', 'p-2');
  cardTitle.classList.add('card-title');
  tempEl.classList.add('card-text');
  windEl.classList.add('card-text');
  humidityEl.classList.add('card-text');
  
  return {
    col,
    cardTitle,
    weatherIcon,
    tempEl,
    windEl,
    humidityEl,
  };
};

// Create a button for a history item
const createHistoryButton = (city: string): HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-controls', 'today forecast');
  btn.classList.add('history-btn', 'btn', 'btn-secondary', 'col-10');
  btn.textContent = city;
  
  return btn;
};

// Create a delete button for a history item
const createDeleteButton = (): HTMLButtonElement => {
  const delBtn = document.createElement('button');
  delBtn.setAttribute('type', 'button');
  delBtn.classList.add('fas', 'fa-trash-alt', 'delete-city', 'btn', 'btn-danger', 'col-2');
  
  delBtn.addEventListener('click', handleDeleteHistoryClick);
  return delBtn;
};

// Create a container div for history items
const createHistoryDiv = (): HTMLDivElement => {
  const div = document.createElement('div');
  div.classList.add('display-flex', 'gap-2', 'col-12', 'm-1');
  return div;
};

// Build a complete history list item
const buildHistoryListItem = (city: CityHistory): HTMLDivElement => {
  const historyDiv = createHistoryDiv();
  const historyBtn = createHistoryButton(city.name);
  const deleteBtn = createDeleteButton();
  
  // Store city data for delete operation
  deleteBtn.dataset.city = JSON.stringify(city);
  
  historyDiv.append(historyBtn, deleteBtn);
  return historyDiv;
};

/**
 * Event Handlers
 */

// Handle form submission for city search
const handleSearchFormSubmit = async (event: Event): Promise<void> => {
  event.preventDefault();
  
  const searchValue = elements.searchInput.value.trim();
  
  if (!searchValue) {
    alert('Please enter a city name');
    return;
  }
  
  try {
    await fetchWeather(searchValue);
    await getAndRenderHistory();
    elements.searchInput.value = '';
  } catch (error) {
    console.error('Search error:', error);
  }
};

// Handle click on a history item
const handleSearchHistoryClick = (event: Event): void => {
  const target = event.target as HTMLElement;
  
  if (target.matches('.history-btn')) {
    const city = target.textContent;
    if (city) {
      fetchWeather(city)
        .then(getAndRenderHistory)
        .catch(err => console.error('History click error:', err));
    }
  }
};

// Handle click on a delete button
const handleDeleteHistoryClick = (event: Event): void => {
  event.stopPropagation();
  
  const target = event.target as HTMLElement;
  const cityData = target.getAttribute('data-city');
  
  if (cityData) {
    try {
      const city = JSON.parse(cityData) as CityHistory;
      deleteCityFromHistory(city.id)
        .then(getAndRenderHistory)
        .catch(err => console.error('Delete error:', err));
    } catch (error) {
      console.error('Error parsing city data:', error);
    }
  }
};

/**
 * Initialize the application
 */

// Fetch and render search history
const getAndRenderHistory = async (): Promise<void> => {
  try {
    const history = await fetchSearchHistory();
    await renderSearchHistory(history);
  } catch (error) {
    console.error('Error getting history:', error);
  }
};

// Add event listeners
elements.searchForm?.addEventListener('submit', handleSearchFormSubmit);
elements.searchHistoryContainer?.addEventListener('click', handleSearchHistoryClick);

// Initialize the application
getAndRenderHistory();