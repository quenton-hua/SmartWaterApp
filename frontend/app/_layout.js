import { Stack } from 'expo-router';

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='(Screens)' options={{headerShown: false}} />
        </Stack>
    )
}

export default StackLayout;