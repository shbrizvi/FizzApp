import { getNetInfo } from "./CommonFunction";
import Constants from "./Constants";

/* const getApiData = async () => {
    const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    );

    const resultData = await result.json();
    setItemList(resultData.data)
    setLoading(false);
} */


async function apiRequest(method, url, body, onSuccess, onError, isAuth = false) {

    let query = '';
    let config = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    let isConnected = await getNetInfo();

    if (isConnected) {
        if (method === 'GET') {
            if (body)
                query = paramsToUrlQueryParams(body);
        } else {
            if (body)
                config['body'] = JSON.stringify(body)
        }
        if (isAuth) {
            config['headers'] = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Constants.access_token}`
            };
        }
        try {
            let response = await fetch(url + query, config);
            let responseJson = await response.json();
            if (response.ok) {
                if (onSuccess)
                    onSuccess(responseJson)
            } else {
                if (onError)
                    onError(responseJson)
            }
            return responseJson;
        } catch (error) {
            console.log(error, "oioioi")
        }

    } else {

        let NoInternet = { no_internet: true, message: "InterNet message here" }
        return NoInternet;

    }
}


export async function login(body, success, error) {
    return apiRequest("POST", `${Constants.API_BASE_URL}/login`, body, success, error)
}
export async function apiNameZher(body, success, error) {
    return apiRequest("POST", `${Constants.API_BASE_URL}/endPointhere`, body, success, error)
}
export async function getCategoryAPI(success, error) {
    return apiRequest("GET", `${Constants.API_BASE_URL}/getItem.php`, null, success, error)
}

function paramsToUrlQueryParams(params) {

    var esc = encodeURIComponent;
    var query = "";
    if (params) {
        query = '?';
        query += Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
    }
    return query;
}