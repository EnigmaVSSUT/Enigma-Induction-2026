import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import { colors } from './src/theme/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background, elevation: 0, shadowOpacity: 0 },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [{
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              }],
              opacity: current.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.8, 1],
              }),
            },
          }),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} options={{ title: 'Note', headerBackTitle: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}