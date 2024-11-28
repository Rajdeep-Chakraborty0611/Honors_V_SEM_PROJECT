import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TextInput, ScrollView } from 'react-native';

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('London'); // Default location
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search input
  const [alerts, setAlerts] = useState([]); // State to hold weather alerts

  // Fetch weather and alerts data
  const fetchWeather = useCallback(async () => {
    setLoading(true); // Show loading indicator
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=9405d31840dc454b8aa80757242611&q=${location}&days=5&alerts=yes` // Fetch with alerts
      );
      const data = await response.json();
      setWeatherData(data);
      setAlerts(data.alerts?.alert || []); // Extract alerts or set empty array if none exist
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  }, [location]);

  // Use useEffect to call fetchWeather when location changes
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Handle search form submit
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setLocation(searchQuery); // Update location state with search query
      setSearchQuery(''); // Clear the search input field
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Enter location"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        weatherData && (
          <View>
            {/* Weather Information */}
            <Text style={styles.infoText}>Location: {weatherData.location.name}</Text>
            <Text style={styles.infoText}>
              Temperature: {weatherData.current.temp_c}°C
            </Text>
            <Text style={styles.infoText}>
              Condition: {weatherData.current.condition.text}
            </Text>            
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    paddingLeft: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  alertBox: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffcccc',
    borderRadius: 5,
    width: '100%',
  },
  alertText: {
    fontSize: 14,
  },
  noAlertText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
});

export default HomeScreen;
