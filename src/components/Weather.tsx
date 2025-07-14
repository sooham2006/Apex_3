import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Eye, Droplets, Thermometer, RefreshCw, MapPin, Calendar, CloudSnow, Zap, CloudDrizzle, Sunrise, Sunset, Gauge, Navigation } from 'lucide-react';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  sunrise: string;
  sunset: string;
  windDirection: number;
  cloudiness: number;
  timezone: number;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('London');

  const API_KEY = '3cdf50adf5a08ce2c7aa9a5c05d7a927';

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again.');
        }
      }
      
      const data = await response.json();
      
      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(data.visibility / 1000), // Convert m to km
        pressure: data.main.pressure,
        icon: getWeatherIconType(data.weather[0].icon),
        feelsLike: Math.round(data.main.feels_like),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        windDirection: data.wind.deg || 0,
        cloudiness: data.clouds.all,
        timezone: data.timezone
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIconType = (iconCode: string): string => {
    const iconMap: { [key: string]: string } = {
      '01d': 'sunny',
      '01n': 'clear-night',
      '02d': 'partly-cloudy',
      '02n': 'partly-cloudy-night',
      '03d': 'cloudy',
      '03n': 'cloudy',
      '04d': 'overcast',
      '04n': 'overcast',
      '09d': 'drizzle',
      '09n': 'drizzle',
      '10d': 'rainy',
      '10n': 'rainy',
      '11d': 'thunderstorm',
      '11n': 'thunderstorm',
      '13d': 'snowy',
      '13n': 'snowy',
      '50d': 'foggy',
      '50n': 'foggy'
    };
    return iconMap[iconCode] || 'sunny';
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherIcon = (iconType: string) => {
    const iconProps = { size: 80, className: "drop-shadow-lg" };
    
    switch (iconType) {
      case 'sunny':
        return <Sun className="text-amber-500 animate-pulse" {...iconProps} />;
      case 'clear-night':
        return <div className="relative"><Sun className="text-indigo-400" {...iconProps} /><div className="absolute inset-0 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full opacity-30"></div></div>;
      case 'partly-cloudy':
        return <Cloud className="text-sky-500" {...iconProps} />;
      case 'cloudy':
        return <Cloud className="text-slate-500" {...iconProps} />;
      case 'overcast':
        return <Cloud className="text-gray-500" {...iconProps} />;
      case 'drizzle':
        return <CloudDrizzle className="text-sky-500" {...iconProps} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" {...iconProps} />;
      case 'thunderstorm':
        return <Zap className="text-yellow-500" {...iconProps} />;
      case 'snowy':
        return <CloudSnow className="text-slate-400" {...iconProps} />;
      case 'foggy':
        return <Cloud className="text-gray-400 opacity-75" {...iconProps} />;
      default:
        return <Sun className="text-amber-500" {...iconProps} />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < -10) return 'from-blue-400 to-blue-500';
    if (temp < 0) return 'from-cyan-400 to-blue-400';
    if (temp < 10) return 'from-sky-400 to-cyan-400';
    if (temp < 20) return 'from-emerald-400 to-sky-400';
    if (temp < 30) return 'from-yellow-400 to-emerald-400';
    if (temp < 40) return 'from-orange-400 to-yellow-400';
    return 'from-red-400 to-orange-400';
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const getAirQualityColor = (value: number, type: 'humidity' | 'pressure' | 'visibility') => {
    switch (type) {
      case 'humidity':
        if (value < 30) return 'text-orange-500';
        if (value > 70) return 'text-blue-500';
        return 'text-emerald-500';
      case 'pressure':
        if (value < 1000) return 'text-red-500';
        if (value > 1020) return 'text-blue-500';
        return 'text-emerald-500';
      case 'visibility':
        if (value < 5) return 'text-red-500';
        if (value < 10) return 'text-amber-500';
        return 'text-emerald-500';
      default:
        return 'text-gray-600';
    }
  };

  const popularCities = [
    'London', 'Paris', 'Tokyo', 'New York', 'Sydney', 'Dubai', 'Singapore', 'Mumbai',
    'Los Angeles', 'Berlin', 'Rome', 'Barcelona', 'Amsterdam', 'Bangkok', 'Seoul', 'Cairo'
  ];

  const getBackgroundGradient = (iconType: string) => {
    switch (iconType) {
      case 'sunny':
        return 'from-yellow-50 via-amber-50 to-orange-50';
      case 'clear-night':
        return 'from-indigo-50 via-purple-50 to-blue-50';
      case 'partly-cloudy':
        return 'from-sky-50 via-blue-50 to-cyan-50';
      case 'cloudy':
      case 'overcast':
        return 'from-gray-50 via-slate-50 to-gray-100';
      case 'rainy':
      case 'drizzle':
        return 'from-blue-50 via-sky-50 to-cyan-50';
      case 'thunderstorm':
        return 'from-slate-50 via-gray-50 to-slate-100';
      case 'snowy':
        return 'from-blue-25 via-slate-50 to-blue-50';
      case 'foggy':
        return 'from-gray-50 via-slate-50 to-gray-100';
      default:
        return 'from-blue-25 via-indigo-25 to-purple-25';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weatherData ? getBackgroundGradient(weatherData.icon) : 'from-blue-25 via-indigo-25 to-purple-25'} pt-16 transition-all duration-1000`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-700 mb-4 drop-shadow-sm">
            <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              Weather Dashboard
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Get real-time weather information with beautiful visualizations and comprehensive forecasts.
          </p>
        </div>

        {/* Enhanced Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border border-white/60 shadow-lg">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-500 focus:ring-4 focus:ring-blue-200 outline-none text-lg font-medium shadow-sm"
                  onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData()}
                />
              </div>
              <button
                onClick={fetchWeatherData}
                disabled={loading}
                className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
              >
                {loading ? (
                  <RefreshCw className="animate-spin" size={24} />
                ) : (
                  <div className="flex items-center">
                    <span className="hidden sm:inline mr-2">Search</span>
                    <RefreshCw size={20} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4 font-medium">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {popularCities.map((cityName) => (
              <button
                key={cityName}
                onClick={() => {
                  setCity(cityName);
                  setTimeout(() => fetchWeatherData(), 100);
                }}
                className="bg-white/80 hover:bg-white/95 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl transition-all duration-200 border border-white/70 hover:border-blue-300 text-sm font-medium transform hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-3xl text-center shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Cloud className="text-red-500 mr-2" size={24} />
                <span className="font-semibold">Weather Error</span>
              </div>
              <p>{error}</p>
            </div>
          </div>
        )}

        {weatherData && !loading && (
          <div className="max-w-7xl mx-auto">
            {/* Main Weather Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl mb-8 border border-white/60 transform hover:scale-[1.02] transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left Side - Location & Icon */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className="relative">
                      {getWeatherIcon(weatherData.icon)}
                      <div className="absolute -inset-4 bg-gradient-to-r from-white/50 to-transparent rounded-full blur-xl"></div>
                    </div>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 mb-2 drop-shadow-sm">
                    {weatherData.city}
                  </h2>
                  <p className="text-gray-600 text-lg mb-2">{weatherData.country}</p>
                  <p className="text-gray-500 text-lg capitalize mb-4 font-medium">
                    {weatherData.description}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start text-gray-500 text-sm">
                    <Calendar className="mr-2" size={16} />
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                {/* Center - Temperature */}
                <div className="text-center">
                  <div className={`text-8xl lg:text-9xl font-bold mb-4 bg-gradient-to-br ${getTemperatureColor(weatherData.temperature)} bg-clip-text text-transparent drop-shadow-lg`}>
                    {weatherData.temperature}°
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-xl font-medium">
                      Feels like {weatherData.feelsLike}°C
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-gray-500">
                      <span className="flex items-center">
                        <span className="text-blue-500">↓</span> {weatherData.tempMin}°
                      </span>
                      <span className="flex items-center">
                        <span className="text-red-500">↑</span> {weatherData.tempMax}°
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/50 shadow-sm">
                    <Wind className="text-blue-500 mx-auto mb-2" size={24} />
                    <div className="text-xl font-bold text-gray-700">{weatherData.windSpeed}</div>
                    <div className="text-gray-500 text-sm">km/h {getWindDirection(weatherData.windDirection)}</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/50 shadow-sm">
                    <Droplets className="text-blue-500 mx-auto mb-2" size={24} />
                    <div className={`text-xl font-bold ${getAirQualityColor(weatherData.humidity, 'humidity')}`}>
                      {weatherData.humidity}%
                    </div>
                    <div className="text-gray-500 text-sm">Humidity</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/50 shadow-sm">
                    <Eye className="text-blue-500 mx-auto mb-2" size={24} />
                    <div className={`text-xl font-bold ${getAirQualityColor(weatherData.visibility, 'visibility')}`}>
                      {weatherData.visibility}km
                    </div>
                    <div className="text-gray-500 text-sm">Visibility</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/50 shadow-sm">
                    <Gauge className="text-blue-500 mx-auto mb-2" size={24} />
                    <div className={`text-xl font-bold ${getAirQualityColor(weatherData.pressure, 'pressure')}`}>
                      {weatherData.pressure}
                    </div>
                    <div className="text-gray-500 text-sm">hPa</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Weather Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Wind Details */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 backdrop-blur-lg rounded-3xl p-6 border border-blue-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 font-bold text-lg">Wind</h3>
                  <div className="relative">
                    <Navigation 
                      className="text-blue-600" 
                      size={28} 
                      style={{ transform: `rotate(${weatherData.windDirection}deg)` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Speed</span>
                    <span className="text-gray-800 font-semibold">{weatherData.windSpeed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Direction</span>
                    <span className="text-gray-800 font-semibold">{getWindDirection(weatherData.windDirection)} ({weatherData.windDirection}°)</span>
                  </div>
                </div>
              </div>

              {/* Atmospheric Pressure */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 backdrop-blur-lg rounded-3xl p-6 border border-purple-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 font-bold text-lg">Pressure</h3>
                  <Thermometer className="text-purple-600" size={28} />
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {weatherData.pressure}
                  </div>
                  <div className="text-gray-600 text-sm">hPa</div>
                  <div className={`text-sm font-medium ${getAirQualityColor(weatherData.pressure, 'pressure')}`}>
                    {weatherData.pressure < 1000 ? 'Low Pressure' : 
                     weatherData.pressure > 1020 ? 'High Pressure' : 'Normal Pressure'}
                  </div>
                </div>
              </div>

              {/* Sunrise */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-100 backdrop-blur-lg rounded-3xl p-6 border border-yellow-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 font-bold text-lg">Sunrise</h3>
                  <Sunrise className="text-amber-600" size={28} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {weatherData.sunrise}
                </div>
                <div className="text-gray-600 text-sm">Local time</div>
              </div>

              {/* Sunset */}
              <div className="bg-gradient-to-br from-orange-50 to-red-100 backdrop-blur-lg rounded-3xl p-6 border border-orange-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 font-bold text-lg">Sunset</h3>
                  <Sunset className="text-orange-600" size={28} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {weatherData.sunset}
                </div>
                <div className="text-gray-600 text-sm">Local time</div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Air Quality Indicators */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                  <Eye className="mr-3 text-blue-600" size={28} />
                  Air Quality
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getAirQualityColor(weatherData.humidity, 'humidity')}`}>
                      {weatherData.humidity}%
                    </div>
                    <div className="text-gray-600 text-sm mb-1">Humidity</div>
                    <div className={`text-xs font-medium ${getAirQualityColor(weatherData.humidity, 'humidity')}`}>
                      {weatherData.humidity < 30 ? 'Dry' : weatherData.humidity > 70 ? 'Humid' : 'Comfortable'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getAirQualityColor(weatherData.visibility, 'visibility')}`}>
                      {weatherData.visibility}km
                    </div>
                    <div className="text-gray-600 text-sm mb-1">Visibility</div>
                    <div className={`text-xs font-medium ${getAirQualityColor(weatherData.visibility, 'visibility')}`}>
                      {weatherData.visibility < 5 ? 'Poor' : weatherData.visibility < 10 ? 'Moderate' : 'Excellent'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloud Coverage */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                  <Cloud className="mr-3 text-gray-600" size={28} />
                  Cloud Coverage
                </h3>
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-700 mb-4">
                    {weatherData.cloudiness}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-gray-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${weatherData.cloudiness}%` }}
                    ></div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {weatherData.cloudiness < 25 ? 'Clear skies' : 
                     weatherData.cloudiness < 50 ? 'Partly cloudy' : 
                     weatherData.cloudiness < 75 ? 'Mostly cloudy' : 'Overcast'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-auto border border-white/60 shadow-xl">
              <div className="relative mb-6">
                <RefreshCw className="animate-spin text-blue-600 mx-auto" size={64} />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
              </div>
              <p className="text-gray-700 text-xl font-semibold mb-4">Fetching weather data...</p>
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;