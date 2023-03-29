import moment from 'moment/moment';

import {DeviceEventEmitter, Dimensions, PixelRatio, Platform} from 'react-native';
import NetInfo from "@react-native-community/netinfo";


export function calc_age(inputDate) {
  let formatted_date = moment(new Date(inputDate));
  let today_date = moment(new Date());

  let years = today_date.diff(formatted_date, 'years');
  let months = today_date.diff(formatted_date, 'months');

  let diff_years = years;
  let diff_months = months - years * 12;

  return diff_years + ' Years ' + diff_months + ' months ';
}

export const {width, height} = Dimensions.get('window');

export function is_date_expired(inputDate) {
  if (inputDate === null || inputDate === '') return false;
  let formatted_date = moment(new Date(inputDate));
  let today_date = moment(new Date());
  return today_date.isAfter(formatted_date);
}

export function getWidth(toCalculate) {
  return (toCalculate / 360) * width;
}

export function normalize(size) {
  const scale= width/360;
 let newSize=scale*size;
 let value=size;
  if(Platform.OS=='ios'){
      value= Math.round(PixelRatio.roundToNearestPixel(newSize));        
  }else value = Math.round(PixelRatio.roundToNearestPixel(newSize))-1;
  return value
}

export async function getNetInfo() {
  return NetInfo.fetch().then(state => {
   // console.log("Connection type", state.type);
    //console.log("Is connected?", state.isConnected);
      return state.isConnected;
  });

}
export function getCurrentDateTime(format="yyyy-MM-DD hh:mm:ss") {
  let date_time=moment().format(format);
  console.log(date_time.toString())
  return date_time;
}
// export function getRandomColor(index) {

//   return Colors.my_org_color[index];
// }
// export function getRandomBGColor(index) {
 
//   return Colors.my_org_bg_color[index];
// }
export function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}
