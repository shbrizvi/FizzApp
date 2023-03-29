import { ImageBackground, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ScreenDimensions, Colors } from '../../AppStyles'
import { FizzContext } from "./AppContext";
import Category from './Category';
import FoodItem from './FoodItem';
import { get_category, get_data, get_subcategory } from '../database/db';

const Home = () => {
    const [itemList, setItemList] = useState({limit : 10, offset : 1});
    const { category,setCategory, dataSet, setDataSet } = useContext(FizzContext)

    const setCategoryData = async() => {
    
        let category = await get_category()
        
         setCategory(category);    
    }

    const getData = async() => {
        let data = await get_data(10,itemList.offset);
        setDataSet([...dataSet, ...data]);
        console.log("data======="+ itemList.limit);
        setItemList({offset : itemList.offset+10});

    }
    useEffect(() => {
        setCategoryData();
        getData();
       // listData();
    

    }, [])

    const listData = () => {
        let temp;
        console.log("data======="+ dataSet.length);
        if (dataSet.length > 10) {
            temp = dataSet.splice(0, 10)
            setItemList(
                itemList.concat(temp)

            )
        }
        else {
            setItemList(
                itemList.concat(dataSet.splice(0))
            )
        }

    }

    return (
        <View style={styles.body}>
            <ImageBackground
                style={styles.bgBody}
                source={require('../assets/background.png')} >
                <View style={styles.logo}>
                    <Image
                        resizeMode='contain'
                        source={require('../assets/logo.png')}></Image>
                </View>
                <View style={styles.panel}>
                    <View style={styles.leftPanel}>
                        <FlatList
                            data={category}
                            enableEmptySections={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={Category}
                        />

                    </View>
                    <View style={styles.rightPanel}>
                        <FlatList
                            data={dataSet}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={FoodItem}
                            numColumns={2}
                            onEndReachedThreshold={0.5}
                            onEndReached={getData}
                        />
                    </View>
                </View>

            </ImageBackground>
            <Text>Home</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    body: {
        width: ScreenDimensions.width,
        height: ScreenDimensions.height,
        backgroundColor: Colors.accent
    },
    bgBody: {
        width: ScreenDimensions.width,
        height: ScreenDimensions.height,
    },
    logo: {
        width: ScreenDimensions.width,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    panel: {
        width: ScreenDimensions.width,
        flexDirection: 'row'
    },
    leftPanel: {
        width: '35%',
        height: '95%',
        justifyContent: 'flex-start',
    },
    rightPanel: {
        width: '65%',
        height: '95%',

    },

})