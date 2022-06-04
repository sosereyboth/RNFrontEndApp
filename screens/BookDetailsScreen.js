import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookDetailsScreen = ({ route, navigation }) => {

    const { token } = useSelector(state => state.authReducer);
    const controller = new AbortController();
    const { bookId } = route.params
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')

    async function getUsernameFromLocalStorage() {
        const value = await AsyncStorage.getItem('@username')
        setUsername(value)
    }
    // const getToken = () => {
    //     AsyncStorage.getItem('@token')
    //         .then(function (data) {
    //             return data
    //         })
    //     return null;
    // }

    // const getBookDetails = async (unmounted) => {

    //     const options = {
    //         method: 'GET',
    //         url: `/books/${bookId}`,
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         },
    //         params: { signal: controller.signal }
    //     };

    //     axios.request(options).then(function (response) {

    //         if (!unmounted) {
    //             setBook(response.data)
    //         }

    //     }).catch(function (er) {
    //         if (!unmounted) {
    //             setBook(null)
    //             if (axios.isCancel(e)) {
    //                 console.log(`request cancelled:${e.message}`);
    //             } else {
    //                 console.log("another error happened:" + e.message);
    //             }
    //         }
    //     });
    // }

    const handleReserveBook = (value) => {
        const options = {
            method: 'POST',
            url: `/reserve`,
            data: {
                'bookId': bookId,
                'reserved': value
            },
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { signal: controller.signal }
        };

        axios.request(options).then(function (response) {

            console.log(response.data)
            navigation.goBack();

        }).catch(function (er) {
            if (axios.isCancel(e)) {
                console.log(`request cancelled:${e.message}`);
            } else {
                console.log("another error happened:" + e.message);
            }
        });
    }



    useEffect(() => {

        setLoading(true)

        let unmounted = false;
        // getBookDetails(unmounted)

        getUsernameFromLocalStorage();

        const options = {
            method: 'GET',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { signal: controller.signal }
        };

        axios.request(options).then(function (response) {

            if (!unmounted) {
                setBook(response.data)
                setLoading(false)
            }

        }).catch(function (er) {
            if (!unmounted) {
                setBook(null)
                if (axios.isCancel(e)) {
                    console.log(`request cancelled:${e.message}`);
                } else {
                    console.log("another error happened:" + e.message);
                }
            }
            setLoading(false)
        });

        // useEffect cleanup
        return function () {
            unmounted = true;
            controller.abort();
        };

    }, [])

    if (loading)
        return <ActivityIndicator size={30} style={{ marginTop: 20 }} />


    return (
        <SafeAreaView style={{
            flex: 1,
            marginTop: 20,
            marginHorizontal: 20,
            marginBottom: 150,
        }}>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Title:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={book.title}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Description:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={book.description}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Author:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={book.author}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelStyle}>Category:</Text>
                <TextInput style={styles.textInput}
                    placeholder='Title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={book.category}
                />
            </View>
            {
                book.reservedBy
                    ? <Text style={{ color: 'gray', fontSize: 18, alignSelf: 'center', marginVertical: 20 }}>
                        This book was reserved by: <Text style={{ fontWeight: 'bold' }}>{book.reservedBy}</Text>
                    </Text>
                    : <Button title='Reserve This Book' onPress={() => handleReserveBook(true)} />
            }
            {book.reservedBy === username
                ? <Button title='Return This Book'
                    onPress={() => handleReserveBook(false)} />
                : null
            }

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

export default BookDetailsScreen