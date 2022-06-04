import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated } from '../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeMenuScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("@token")
            await AsyncStorage.removeItem("@username")
            dispatch(setAuthenticated(false));

        } catch (e) {
            alert('Failed to save the data to the storage')
            console.log(e)
        }
    }

    return (
        <SafeAreaView
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1

            }}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Welcome</Text>
            </View>
            <View>
                <Button title='All Books'
                    onPress={() => navigation.navigate("AllBooks", { showMyReserved: false })} />
                <Button title='My Reserved Books'
                    onPress={() => navigation.navigate("AllBooks", { showMyReserved: true })} />
                <Button title='My Profile'
                    onPress={() => navigation.navigate("MyProfile")} />

                <Button title='Log Out'
                    onPress={async () => {
                        handleLogout();
                    }} />
            </View>

        </SafeAreaView>
    )
}

export default HomeMenuScreen

const styles = StyleSheet.create({})