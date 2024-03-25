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
const MainTab = createBottomTabNavigator();
const AuthTab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <MainTab.Navigator screenOptions={{ headerShown: false }}>
     <MainTab.Screen
      name="Home"
      component={MyGoalScreen}
      options={{
        title: "Home",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" size={size} color={color}/>
        )
      }}
    />
    <MainTab.Screen
      name="WaterLevel"
      component={WaterLevelScreen}
      options={{
        title: "Water Level",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="water-outline" size={size} color={color}/>
        )
      }}
    />
    <MainTab.Screen
      name="Leaderboard"
      component={LeaderboardScreen}
      options={{
        title: "Leaderboard",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="medal-outline" size={size} color={color}/>
        )
      }}
    />
    <MainTab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: "Settings",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" size={size} color={color}/>
        )
      }}
    />
  </MainTab.Navigator>
);

const AuthStackNavigator = ({ route }) => {
  const { setCurrentUser } = route.params;

  return (
    <AuthTab.Navigator screenOptions={{ headerShown: false }} >

      <AuthTab.Screen name="Login" options={{     // Login screen for authentication navigation
        headerShown: false,
        title: "Login",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" size={size} color={color}/>
        )
        }}>
        {(props) => <LoginScreen {...props} setCurrentUser={setCurrentUser} />}
      </AuthTab.Screen>
      
      <AuthTab.Screen name="Register" options={{    // Register screen for authentication navigation
        headerShown: false, 
        title: "Register",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="person-add-outline" size={size} color={color}/>
        )
        }}>
        {(props) => <RegisterScreen {...props} setCurrentUser={setCurrentUser} />}
      </AuthTab.Screen>
    </AuthTab.Navigator>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <NavigationContainer options={{ headerShown: false }} independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            initialParams={{ setCurrentUser }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
