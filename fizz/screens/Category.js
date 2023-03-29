import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { ScreenDimensions, Colors, FontName } from '../../AppStyles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Category({item}) {

    const handleCategory = () => {

    }
    return (
        <TouchableOpacity style={styles.body} onPress={() => { handleCategory }}>

            <View style={{ flex: 3 , marginHorizontal : 2}}>
                <FontAwesome5
                    name={'plus'}
                    size={35}
                    color={'#000000'}
                />
            </View>
            <View style={{ flex: 7 }}>
                <Text style={{ fontFamily: FontName.font2, fontSize :18 }}>{item.name}</Text>
            </View>
            

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    body: {

        height: 80,
        backgroundColor: Colors.category,
        flexDirection: 'row',
        marginHorizontal: 2,
        marginVertical: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }

})