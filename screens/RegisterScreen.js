import { View, Text, SafeAreaView, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from '../api/axios';
import { useSelector, useDispatch } from 'react-redux'

const RegisterScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    // const [fullName,]
    const [error, setError] = useState('')

    const handleRegister = () => {
        const options = {
            method: 'POST',
            url: '/register',
            data: {
                'fullName': fullName,
                'userName': username,
                'password': password,
                'email': email,
                'phone': phone
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            navigation.navigate("Login")

        }).catch(function (er) {
            console.log(er)
            setError("Register failed. Please try again.")
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
                <Text>Full Name:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Full Name'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={fullName}
                    onChangeText={setFullName} />
            </View>
            <View style={styles.textInputContainer}>
                <Text>Username:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername} />
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
            <View style={styles.textInputContainer}>
                <Text>Phone:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Phone'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text>Email:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button title='Register'
                onPress={handleRegister} />
        </SafeAreaView>
    )
}

export default RegisterScreen

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