import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import WeatherAlertsScreen from './screens/WeatherAlertsScreen'; // Updated screen name
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Set icons based on route name
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Weather Alerts') {
              iconName = focused ? 'ios-warning' : 'ios-warning-outline';
            }

            // Return the icon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0078D7', // Active tab color
          tabBarInactiveTintColor: 'gray', // Inactive tab color
        })}
      >
        {/* Home Screen */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false, // Hide header
          }}
        />

        {/* Weather Alerts Screen */}
        <Tab.Screen
          name="Weather Alerts"
          component={WeatherAlertsScreen}
          options={{
            headerShown: false, // Hide header
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

