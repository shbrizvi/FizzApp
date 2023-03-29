import Config from 'react-native-config';
import { Platform } from 'react-native';

const ENVIRONMENT = Config.APP_ENV;
const DEBUG = ENVIRONMENT === 'staging';
const DATABASE_NAME = 'fizz';
const SHOW_ADS = Config.SHOW_ADS === 'true';
const API_BASE_URL = 'http://myorinc.com';

const { APP_NAME } = Config;
const IOS_APP_ID = '1572227802';
const ANDROID_APP_ID = 'com.aadhya.tpp'; // package name
const APP_ID = Platform.OS === 'ios' ? IOS_APP_ID : ANDROID_APP_ID;

const IOS_RATE_URL = `https://itunes.apple.com/app/id${APP_ID}`;
const ANDROID_RATE_URL = `https://play.google.com/store/apps/details?id=${APP_ID}`;

const IOS_MORE_APPS_URL = 'itms-apps://itunes.apple.com/in/artist/nexogen-private-limited/id869478131';

const ANDROID_MORE_APPS_URL = 'market://search?q=pub:CAVERNS+DEN+STUDIOS';

const SHARE_MESSAGE = 'this is a share message';

export default {
  DEBUG,
  SHOW_ADS,
  ENVIRONMENT,
  IOS_RATE_URL,
  ANDROID_RATE_URL,
  APP_ID,
  IOS_APP_ID,
  ANDROID_APP_ID,
  IOS_MORE_APPS_URL,
  ANDROID_MORE_APPS_URL,
  APP_NAME,
  SHARE_MESSAGE,
  DATABASE_NAME,
  API_BASE_URL
};
