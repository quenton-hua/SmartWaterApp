import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens
import LoginScreen from './(Screens)/LoginScreen';
import RegisterScreen from './(Screens)/RegisterScreen';
import MyGoalScreen from './(Screens)/MyGoalScreen';
import SettingsScreen from './(Screens)/SettingsScreen';
import WaterLevelScreen from './(Screens)/WaterLevelScreen';
import LeaderboardScreen from './(Screens)/LeaderboardScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={MyGoalScreen}
      options={{
        title: "Home",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" size={size} color={color}/>
        )
      }}
    />
    <Tab.Screen
      name="WaterLevel"
      component={WaterLevelScreen}
      options={{
        title: "Water Level",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="water-outline" size={size} color={color}/>
        )
      }}
    />
    <Tab.Screen
      name="Leaderboard"
      component={LeaderboardScreen}
      options={{
        title: "Leaderboard",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="medal-outline" size={size} color={color}/>
        )
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: "Settings",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" size={size} color={color}/>
        )
      }}
    />
  </Tab.Navigator>
);

// Stack navigator for the authentication flow
const AuthStackNavigator = ({ setCurrentUser }) => (
  <Stack.Navigator>
    <Stack.Screen name="Login" options={{ headerShown: false }}>
      {(props) => <LoginScreen {...props} setCurrentUser={setCurrentUser} />}
    </Stack.Screen>
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <NavigationContainer independent={true}>
      {currentUser ? (
        <MainTabNavigator />
      ) : (
        <AuthStackNavigator setCurrentUser={setCurrentUser} />
      )}
    </NavigationContainer>
  );
};

export default App;
