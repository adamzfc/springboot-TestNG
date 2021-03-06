/**
 * Created by Administrator on 2017/8/16 0016.
 */
import fetch from 'dva/fetch';

let contextPath = "/";
let pathName = document.location.pathname;
if (pathName === "/" || pathName === "/index.html") {
    contextPath = "/";
} else {
    let index = pathName.substr(1).indexOf("/");
    contextPath = pathName.substr(0, index + 1) + "/";
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
    options.headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (sessionStorage.getItem("access_token") || "")
    };

    const response = await fetch(contextPath + url, options);
    checkStatus(response);

    return await response.json();
}

