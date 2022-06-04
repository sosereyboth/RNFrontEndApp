import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import * as navRef from '../RootNavigation'
import { icons } from '../constants'

const BookCard = ({ book }) => {
    return (
        <View style={styles.container}>
            {book.reservedBy
                ? <Image source={icons.bookmark_filled}
                    style={{
                        position: 'absolute',
                        top: 10, right: 10,
                        width: 15,
                        height: 15,
                        tintColor: "red"
                    }}
                />
                // <View style={{
                //     backgroundColor: "red",
                //     height: 15,
                //     width: 15,
                //     position: 'absolute',
                //     top: 10, right: 10,
                //     borderRadius: 7
                // }} ></View>
                : null}

            <TouchableOpacity
                onPress={() => navRef.navigate('BookDetails', { bookId: book.id })}
            >
                <View style={{ flexDirection: 'row' }}>
                    {/* <Image source={icons.book}
                        resizeMode="contain"
                        style={{
                            width: 70,
                            height: 70,
                            tintColor: 'black'
                        }}
                    /> */}
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{book.title}</Text>
                        <Text style={{ color: 'darkgray', fontSize: 11 }}>By: {book.author}</Text>
                        <Text style={{ color: 'gray', marginTop: 5 }}>{book.description}</Text>
                    </View>
                </View>


            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#efefef',
        borderRadius: 10,
        shadowOffset: { width: 1, height: 5 },  /* Bottom shadow */
        shadowOpacity: 0.2,
        elevation: 10,
    },
});

export default BookCard