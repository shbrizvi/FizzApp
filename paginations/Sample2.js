import { StyleSheet,  View, Image, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const listobj = {
    loading: true,
    randomUserData: [],
    loadingExtraData: false,
    page: 1
}

const Sample2 = () => {
    const [listData, setListData] = useState({
        loading: true,
        randomUserData: [],
        loadingExtraData: false,
        page: 1
    })

    useEffect(() => {
        LoadRandomData();
    }, [])

    LoadRandomData = async () => {

        console.log("get data +"+listData.page);

        await  fetch(`https://randomuser.me/api/?results=10&page=${listData.page}`)
            .then(response => response.json())
            .then(responseJson => {
                setListData({
                    ...listData,
                          randomUserData : [...listData.randomUserData, ...responseJson.results]
                })
            })
            .catch(error => {

                console.log('Error selecting random data: ' + error)
            })
    }

    LoadMoreRandomData = () => {
        console.log("get more data "+ listData.loadingExtraData);

        setListData({ 
            ...listData,
            page: listData.page + 1 ,
            loadingExtraData : !listData.loadingExtraData
        })
        LoadRandomData(); 
    }

    renderCustomItem = ({ item, index }) => {

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <Text>{item.gender}</Text>
                <Text>{item.name["first"]} {item.name["last"]}</Text>
                <Image source={{ uri: item.picture["medium"] }} style={{ width: 200, height: 200 }} />
            </View>)
    }


    return (
        <View>
            <FlatList
                data={listData.randomUserData}
                renderItem={renderCustomItem}
                style={{ width: 350, height: 800 }}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={1}
                onEndReached={LoadMoreRandomData}
            />
        </View>
    )

   
}

export default Sample2

const styles = StyleSheet.create({})