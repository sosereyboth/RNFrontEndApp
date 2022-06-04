import { View, Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useSelector } from 'react-redux'

const MyProfileScreen = ({ navigation }) => {

    const { token } = useSelector(state => state.authReducer);
    const controller = new AbortController();
    const [user, setUser] = useState(null)
    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {


        let unmounted = false;
        // getBookDetails(unmounted)

        const options = {
            method: 'GET',
            url: `/users`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { signal: controller.signal }
        };

        axios.request(options).then(function (response) {

            if (!unmounted) {
                console.log(response.data)
                setUser(response.data)
                setId(response.data.id);
                setFullName(response.data.fullName);
                setUsername(response.data.userName);
                setPhone(response.data.phone);
                setEmail(response.data.email);
            }

        }).catch(function (er) {
            if (!unmounted) {
                setUser(null)
                if (axios.isCancel(e)) {
                    console.log(`request cancelled:${e.message}`);
                } else {
                    console.log("another error happened:" + e.message);
                }
            }
        });

        // useEffect cleanup
        return function () {
            unmounted = true;
            controller.abort();
        };

    }, [])

    const handleUpdateProfile = () => {
        const options = {
            method: 'PUT',
            url: `/users`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                'id': id,
                'fullName': fullName,
                'userName': username,
                'phone': phone,
                'email': email
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            navigation.goBack();

        }).catch(function (er) {
            console.log(er)
            if (axios.isCancel(e)) {
                console.log(`request cancelled:${e.message}`);
            } else {
                console.log("another error happened:" + e.message);
            }

        });
    }

    if (user == null)
        return null;

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 20,
            marginBottom: 150,
        }}>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Full Name:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Full Name'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Username:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Phone:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Phone'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Email:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <Button title='Update Profile'
                onPress={handleUpdateProfile} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        marginVertical: 10
    },
    textInput: {
        paddingHorizontal: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        height: 35,
        width: '100%'
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default MyProfileScreen