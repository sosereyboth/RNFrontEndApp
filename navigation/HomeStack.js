import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeMenuScreen, MyProfileScreen, AllBooksScreen, ReservedBooksScreen, BookDetailsScreen } from '../screens'
import { navigationRef } from '../RootNavigation';

const Stack = createNativeStackNavigator();

export default class HomeStack extends Component {
    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator >
                    <Stack.Screen name="HomeMenu" component={HomeMenuScreen}
                        options={{
                            headerShown: false,
                            gestureEnabled: false
                        }} />

                    <Stack.Screen name='MyProfile' component={MyProfileScreen} />
                    <Stack.Screen name='AllBooks' component={AllBooksScreen} />
                    <Stack.Screen name='ReservedBooks' component={ReservedBooksScreen} />
                    <Stack.Screen name='BookDetails' component={BookDetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}