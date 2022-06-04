import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStack, AuthStack } from '../navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, setAppLoading, setToken } from '../redux/actions'

const ResolveStartup = () => {

    const { authenticated } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [firstLuanch, setFirstLuanch] = useState("0")
    // const { authenticated, appLoading } = useSelector(state => state.authReducer);


    const checkLocalAuth = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            dispatch(setAuthenticated(value == undefined || value == null ? false : true))
            dispatch(setToken(value))
            dispatch(setAppLoading(false))

        } catch (e) {
            console.log("Read local auth error.", e)
        }
    }


    useEffect(() => {


        // Check if first luanch when user not logged in.
        // const value = await AsyncStorage.getItem('@token')
        // dispatch(setAuthenticated(value == undefined || value == null ? false : true))
        checkLocalAuth()


        if (initializing) setInitializing(false);

    }, [authenticated])

    if (initializing) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading...</Text>
                <ActivityIndicator size={29} />
            </View>
        )
    }

    if (authenticated)
        return <HomeStack />

    return <AuthStack />
}

export default ResolveStartup
