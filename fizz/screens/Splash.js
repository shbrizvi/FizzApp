import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home'
import { ScreenDimensions, Colors } from '../../AppStyles'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FizzContext } from "./AppContext";
import { create_table, insert_category , insert_data, insert_subcategory,get_category} from '../database/db';
import DatabaseTable from '../database/DatabaseTable';
import { getCategoryAPI, login } from '../common/ApiCall';


const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    const { setCategory, setDataSet } = useContext(FizzContext)

    useEffect(() => {
       checkDatabase()
        create_table(DatabaseTable.TABLE_CATEGORY, 1);
        create_table(DatabaseTable.TABLE_SUBCATEGORY, 2);
        create_table(DatabaseTable.TABLE_DATA, 3);

    }, [])

    const checkDatabase = async() =>{
        let category = await get_category()
        if(category.length>0)
        navigation.replace('Home');
        else
        getData();
    }

    const getData = async () => {
         
        setLoading(true);
        
        let params={};
        params['email']='uyuyyu';
        params['mobile']='09090990';
        console.log(params);
        // login(params,(succesReaponse)=>{},(error)=>{})

        //Service to get the data from the server to render
      //  let response= await getCategoryAPI()
       // console.log(response,"========reponse from await")
        getCategoryAPI((responseJson)=>{
            //console.log(response,"========reponse from then")
            insert_category(responseJson.category);
            insert_subcategory(responseJson.subcategory);
            insert_data(responseJson.data);


            setLoading(false);
            navigation.replace('Home');
       

        },(error)=>{
            console.error(error);

        });
    }

    return (
        <View style={styles.body}>
            <ImageBackground
                style={styles.bgBody}
                source={require('../assets/splash.png')} >
                {loading && <ActivityIndicator size={'large'} style={styles.loader} />}
            </ImageBackground>
        </View>
    );
}



const Stack = createNativeStackNavigator();

export default function Splash() {
    return (
        <NavigationContainer>
            <Stack.Navigator >

                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    body: {
        width: ScreenDimensions.width,
        height: ScreenDimensions.height,
        backgroundColor: Colors.accent
    },
    bgBody: {
        width: ScreenDimensions.width,
        height: ScreenDimensions.height,
        justifyContent: 'center'
    },
    loader: {
        width: '25%',
        height: '10%',
        alignSelf: 'center',
        backgroundColor: Colors.primaryDark,
        borderRadius: 10,
    }
})