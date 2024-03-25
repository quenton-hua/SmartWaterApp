import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, Text, View } from 'react-native';

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


function CustomHeader() {
  return (
    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Image
          style={{ width: 55, height: 70, marginLeft: 10, marginTop: 5}}
          source={{ uri: 'https://cdn.discordapp.com/attachments/1202329715000754267/1221963156050415656/image_4_2.png?ex=66147cdf&is=660207df&hm=4dd23544d530586fc79148b21b6e1982775a29f9bb4c78dc03809da6c1355983&' }}
        /> */}
        <Text style={{ fontSize: 20, marginLeft: 10, color: 'black' }}>uDrink</Text>
      </View>
    </View>
  );
}



const MainTabNavigator = () => (
  <MainTab.Navigator screenOptions={{
    headerShown: true,
    header: () => <CustomHeader />,
  }}>
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
    <AuthTab.Navigator 
      screenOptions={{
        headerShown: true,
        header: () => <CustomHeader />,
    }}>

      <AuthTab.Screen name="Login" options={{     // Login screen for authentication navigation
        title: "Login",
        tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" size={size} color={color}/>
        ),
        }}>
        {(props) => <LoginScreen {...props} setCurrentUser={setCurrentUser} />}
      </AuthTab.Screen>
      
      <AuthTab.Screen name="Register" options={{    // Register screen for authentication navigation
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
