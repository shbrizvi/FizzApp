import React from 'react';
import { executeSql } from './DatabaseExecutor';
import DatabaseTable from './DatabaseTable';
import { debugLog } from '../common/Logger';

const TAG = 'FIZZ TAG: ';

export const create_table = async (table_name, type = 1) => {
    let query = `create table if not exists ${table_name}(`;

    if (type === 1) {
        query += 'id integer primary key not null, ';
        query += 'name text)';
    }
    else if (type === 2) {
        query += 'id integer primary key not null, ';
        query += 'catid integer , name text)';
    }
    else if (type === 3) {
        query += 'id integer primary key not null, ';
        query += 'catid integer , subid integer , nameEng text , nameArb text , price text , image text , imageLarge text)';
    }

    try {
        const results = await executeSql(query, []);
        debugLog(TAG, `created ${table_name} success ${JSON.stringify(results)}`);
    } catch (error) {
        debugLog(TAG, `creation error on ${table_name}${JSON.stringify(error)}`);
    }
};



// export const createTable = () => {
//     try {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 "CREATE TABLE IF NOT EXISTS" +
//                 "users" + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, EMAIL TEXT"
//             )
//         })
//     }
//     catch (error) {
//         console.log("table creation failed" + error);
//     }
// }

export const insert_category = async (categoryArray) => {
    const table_name = DatabaseTable.TABLE_CATEGORY;

    let query = `insert into ${table_name} `;
    query += `(id, name) `;
    query += `VALUES (?, ?)`;

    if (categoryArray.length === 0) {
        debugLog('mcq array is empty');
    }

    try {
        categoryArray.map(async (item) => {
            let id = parseInt(item.Id);
            let result = await executeSql(`select id from ${table_name} where id = ${id}`, []);
            let array = result.rows;
            if (array.length === 0) {
                await executeSql(query, [id, item.Main_Category_Eng]);
            }
        });
        debugLog(`successfully inserts in ${table_name}`);
    } catch (error) {
        debugLog(`insert error in ${table_name} :` + JSON.stringify(error))
    }
};

export const insert_subcategory = async (subcategoryArray) => {
    const table_name = DatabaseTable.TABLE_SUBCATEGORY;

    let query = `insert into ${table_name} `;
    query += `(id, catid, name) `;
    query += `VALUES (?, ?, ?)`;

    if (subcategoryArray.length === 0) {
        debugLog('mcq array is empty');
    }

    try {
        subcategoryArray.map(async (item) => {
            let id = parseInt(item.Id);
            let categoryid = parseInt(item.Main_Category_Id);

            let result = await executeSql(`select id from ${table_name} where id = ${id}`, []);
            let array = result.rows;
            if (array.length === 0) {
                await executeSql(query, [id, categoryid, item.Item_Category_Eng]);
            }
        });
        debugLog(`successfully inserts in ${table_name}`);
    } catch (error) {
        debugLog(`insert error in ${table_name} :` + JSON.stringify(error))
    }
};

export const insert_data = async (dataArray) => {
    const table_name = DatabaseTable.TABLE_DATA;

    let query = `insert into ${table_name} `;
    query += `(id, catid, subid , nameEng , nameArb , price , image , imageLarge) `;
    query += `VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    if (dataArray.length === 0) {
        debugLog('mcq array is empty');
    }

    try {
        dataArray.map(async (item) => {
            let id = parseInt(item.Sl_No);
            let categoryid = parseInt(item.Main_Category_Eng);
            let subcategoryid = parseInt(item.Item_Category_Eng);


            let result = await executeSql(`select id from ${table_name} where id = ${id}`, []);
            let array = result.rows;
            if (array.length === 0) {
                await executeSql(query, [id, categoryid, subcategoryid, item.Item_Name_Eng, item.Item_Name_Arb, item.Price, item.product_image_url, item.product_large_image_url]);
            }
        });
        debugLog(`successfully inserts in ${table_name}`);
    } catch (error) {
        debugLog(`insert error in ${table_name} :` + JSON.stringify(error))
    }
};

// export const storeData = async (value,navigation) => {

//     try {
//         await db.transaction(async (tx) => {
//         //    await tx.executeSql("INSERT into users (NAME,EMAIL) VALUES ('" + value.name + "','" + value.email + "')")

//             //Alternate easy solution to insert data
//              await tx.executeSql("INSERT into users (NAME,EMAIL) VALUES (?,?)", [value.name, value.email])
//              navigation.navigate('Home');

//         })
//     } catch(e) {
//            console.log("data not insert");
//     }
// }

export const get_category = async () => {
    const table_name = DatabaseTable.TABLE_CATEGORY;
    let query = `select * from ${table_name}  `;

    try {
        let results = await executeSql(query, []);
        if (results.rows.length !== 0) {

            debugLog('category size...' + results.rows.length);
            let rows = results.rows;
            let array = [];
            for (let i = 0; i < rows.length; i++) {
                array.push(rows.item(i));
            }
            return array;
        }
        else {
            debugLog('category not found...');
            return [];
        }
    } catch (error) {
        debugLog(`select error in ${table_name} :` + JSON.stringify(error));
        return undefined;
    }
}

export const get_subcategory = async () => {
    const table_name = DatabaseTable.TABLE_SUBCATEGORY;
    let query = `select * from ${table_name} `;

    try {
        let mcq = await executeSql(query, []);
        if (mcq.rows.length !== 0) {
            debugLog('subcategory size...' + mcq.rows.length);
        }
        else {
            debugLog('subcategory not found...');

        }
    } catch (error) {
        debugLog(`select error in ${table_name} :` + JSON.stringify(error));
        return undefined;
    }
}

export const get_data = async (row_count = 0,offset=0) => {
    const table_name = DatabaseTable.TABLE_DATA;
    let query = `select * from ${table_name} LIMIT ${row_count} OFFSET ${offset} `;
    debugLog('row_count' + row_count + " offset "+offset );

    try {
        let mcq = await executeSql(query, []);
        if (mcq.rows.length !== 0) {
            debugLog('data size...' + mcq.rows.length);
            let rows = mcq.rows;
            let array = [];
            for (let i = 0; i < rows.length; i++) {
                array.push(rows.item(i));
            }
            return array;
        }
        else {
            debugLog('data not found...');

        }
    } catch (error) {
        debugLog(`select error in ${table_name} :` + JSON.stringify(error));
        return undefined;
    }
}

// export const getData = async (navigation) => {
//     console.log("db.js!  get data");

//     navigation.navigate('Home');

//     await db.transaction(async (tx) => {
//         await tx.executeSql("SELECT NAME,EMAIL FROM users", [], (tx, result) => {
//             let len = result.rows.length;
//             console.log("db.js!  get data" + len);
//             if (len > 0) {
//                 navigation.navigate('Home');
//             }
//         });
//     })
// }

export const removeData = async ({ navigation }) => {
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql("DELETE FROM users")
            navigation.navigate('Login')
        })
    } catch (error) {
        console.log(" delete failed")
    }
}

export const updateData = async (value) => {
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                "UPDATE users SET NAME=?",
                [value.name],
                () => console.log("successfully updated"),
                err => console.log("err=" + err)
            )
        })
    } catch (error) {
        err => console.log("err=" + err)

    }
}