import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import MarqueeText from 'react-native-marquee';
import { ScreenDimensions, Colors, FontName } from '../../AppStyles'

const FoodItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBody}>
        <Image
          resizeMode='cover'
          style={styles.imgSty}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <View style={styles.textBody}>
        <MarqueeText
          style={styles.price}
          duration={3000}
          marqueeOnStart
          loop
          marqueeDelay={2000}
          marqueeResetDelay={1000}
        >
          AED {item.price}
        </MarqueeText>

        <MarqueeText
          style={styles.name_eng}
          duration={3000}
          marqueeOnStart
          loop
          marqueeDelay={2000}
          marqueeResetDelay={1000}
        >
          {item.nameEng}
        </MarqueeText>


        <MarqueeText
          style={styles.name_arb}
          duration={3000}
          marqueeOnStart
          loop
          marqueeDelay={2000}
          marqueeResetDelay={1000}
        >
          {item.nameArb}
        </MarqueeText>
      </View>

    </View>
  )
}

export default FoodItem

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 200,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: '#ffffff',
    margin: 5
  },
  imageBody: {
    flex: 1,
    width: '100%',
  },
  imgSty: {

    width: '100%',
    height: '100%',
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: 'grey'
},
  textBody: {
    flex: 1,
    width: '100%',
    alignItems: 'center',

  },
  price: {
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: FontName.font2,
    marginVertical: 2,
    color : '#ffffff'
  },
  name_eng: {
    fontSize: 18,
    width: '95%',
    fontFamily: FontName.font2,
    marginVertical: 2,
    color : '#ffffff'

  },
  name_arb : {
    fontSize: 18,
    width: '95%',
    fontFamily: FontName.font2,
    marginVertical: 2,
    color : '#ffffff',
    justifyContent : 'flex-end'
  },
})