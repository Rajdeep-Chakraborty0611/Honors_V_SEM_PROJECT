import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function WeatherCard({ data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{data.date}</Text>
      <Image source={{ uri: `https:${data.day.condition.icon}` }} style={styles.icon} />
      <Text style={styles.temp}>{data.day.avgtemp_c}°C</Text>
      <Text style={styles.condition}>{data.day.condition.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 18,
    color: '#0078D7',
  },
  condition: {
    fontSize: 16,
    color: 'gray',
  },
});
