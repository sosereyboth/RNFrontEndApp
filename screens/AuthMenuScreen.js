import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'

const AuthMenuScreen = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1

            }}
        >
            <Button title='Log In'
                onPress={() => navigation.navigate("Login")} />
            <Button title='Register'
                onPress={() => navigation.navigate("Register")} />
        </SafeAreaView>
    )
}

export default AuthMenuScreen
