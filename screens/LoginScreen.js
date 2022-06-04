import { View, Text, SafeAreaView, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from '../api/axios';
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, setToken } from '../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function handleLogIn() {
        const options = {
            method: 'POST',
            url: '/authenticate',
            data: {
                'userName': username,
                'password': password
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);

            AsyncStorage.setItem("@token", response.data.token);
            AsyncStorage.setItem("@username", response.data.username);

            dispatch(setAuthenticated(true));
            dispatch(setToken(response.data.token))

        }).catch(function (error) {
            // console.error(error);
            setError("Username or password is not correct.")
            console.log(error)
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                // alignItems: 'center',
                marginHorizontal: 20,
                marginBottom: 150,
            }}>
            <View style={styles.textInputContainer}>
                <Text>Username:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text>Password:</Text>
                <TextInput style={styles.textInput}
                    secureTextEntry={true}
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button title='Log In'
                onPress={handleLogIn} />
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    textInputContainer: {
        marginVertical: 10
    },
    textInput: {
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        height: 35,
        width: '100%'
    }
})