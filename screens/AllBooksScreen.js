import { View, Text, SafeAreaView, FlatList, RefreshControl, BackHandler, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookCard from '../components/BookCard';

const AllBooksScreen = ({ route }) => {

    const { showMyReserved } = route.params;
    console.log(showMyReserved)

    const [books, setBooks] = useState(null)
    const [loading, setLoading] = useState(false)
    const controller = new AbortController();

    const getAllBooks = async (params) => {

        console.log("Loading all books...")
        const token = await AsyncStorage.getItem('@token')

        const options = {
            method: 'GET',
            url: (!showMyReserved ? '/books' : '/reserve'),
            params: { signal: controller.signal },
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        axios.request(options).then(function (response) {
            // console.log(response.data)
            setBooks(response.data);
            setLoading(false)
            console.log("All books loaded.")
        }).catch(function (er) {
            console.log(er)
            setLoading(false)
        });
    }

    const keyExtractor = React.useCallback(item => item.id.toString(), [])
    const renderItem = React.useCallback(({ item }) => <BookCard book={item} />
        , []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setLoading(true)
        wait(2000).then(getAllBooks())

    }, [])

    useEffect(() => {
        setLoading(true)
        // const cancelToken = axios.CancelToken;
        // const source = cancelToken.source();
        getAllBooks()



    }, [])

    if (loading)
        return <ActivityIndicator size={30} style={{ marginTop: 20 }} />

    return (
        <SafeAreaView style={{
            flex: 1,
            margin: 5
        }}>
            <FlatList style={{ marginTop: 10 }}
                ListEmptyComponent={loading == false
                    ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'gray' }}>List is empty</Text>
                        </View>
                    )
                    : null}
                data={books}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}

export default AllBooksScreen