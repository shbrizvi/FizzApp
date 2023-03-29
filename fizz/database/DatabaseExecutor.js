import SQLite from 'react-native-sqlite-storage';
import Constants from '../common/Constants';
import { debugLog } from '../common/Logger';


 // https://medium.com/infinitbility/react-native-sqlite-storage-422503634dd2
const TAG = 'DatabaseExecutor: ';

const db = SQLite.openDatabase(
  Constants.DATABASE_NAME,  
  
  (success) => {
  debugLog(TAG, `database open success : ${success}`);
}, (error) => {
  debugLog(TAG, `database open error : ${JSON.stringify(error)}`);
});

// eslint-disable-next-line import/prefer-default-export
export const executeSql = (sql, params = []) => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(sql, params, (sqlTransaction, results) => {
      resolve(results);
    }, (error) => {
      reject(error);
    });
  });
});
