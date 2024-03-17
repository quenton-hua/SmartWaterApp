import { Tabs } from "expo-router"
import Ionicons from "react-native-vector-icons/Ionicons"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="MyGoalScreen"
            options={{
                title: "Home",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home-outline" size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="WaterLevelScreen"
            options={{
                title: "Water Level",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="water-outline" size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="LeaderboardScreen"
            options={{
                title: "Leaderboard",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="medal-outline" size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="SettingsScreen"
            options={{
                title: "Settings",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="settings-outline" size={size} color={color}/>
                )
            }}/>
        </Tabs>
    )
}