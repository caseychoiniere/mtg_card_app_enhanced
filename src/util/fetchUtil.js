export function getFetchParams(method, apiToken, body) {
    let obj = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': apiToken ? apiToken : ''
        }
    };
    if(body) obj.body = JSON.stringify(body);
    return obj;
}

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        throw new Error(response.status);
    }
}