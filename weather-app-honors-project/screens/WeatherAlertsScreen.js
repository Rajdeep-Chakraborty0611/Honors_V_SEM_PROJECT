import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

const WeatherAlertsScreen = () => {
  const [city, setCity] = useState(''); // State for city input
  const [alerts, setAlerts] = useState([]); // State for alerts
  const [loading, setLoading] = useState(false); // State for loading

  const fetchWeatherAlerts = useCallback(async () => {
    if (!city.trim()) {
      alert('Please enter a city name!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=9405d31840dc454b8aa80757242611&q=${city.trim()}&alerts=yes`
      );
      const data = await response.json();
      setAlerts(data.alerts?.alert || []);
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      alert('Failed to fetch weather alerts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [city]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather Alerts</Text>

      {/* City Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter City Name"
        value={city}
        onChangeText={setCity}
      />

      {/* Fetch Alerts Button */}
      <Button title="Fetch Weather Alerts" onPress={fetchWeatherAlerts} />

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#0078D7" />
      ) : (
        // Alerts List
        alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <View key={index} style={styles.alertBox}>
              <Text style={styles.alertText}>Event: {alert.event}</Text>
              <Text style={styles.alertText}>
                Starts: {alert.start ? alert.start : 'N/A'}
              </Text>
              <Text style={styles.alertText}>
                Ends: {alert.end ? alert.end : 'N/A'}
              </Text>
              <Text style={styles.alertText}>
                Description: {alert.desc || 'No description available'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noAlertText}>
            No active weather alerts available.
          </Text>
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
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  alertBox: {
    width: '100%',
    backgroundColor: '#ffe6e6',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  alertText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  noAlertText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
  },
});

export default WeatherAlertsScreen;
