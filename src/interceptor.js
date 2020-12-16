import fetchIntercept from 'fetch-intercept';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        if(url !== 'http://127.0.0.1:8000/token/refresh/' && url !== 'http://127.0.0.1:8000/token/'){
            const token = localStorage.getItem('token')
            if(token){
                config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
            }
        }
        if(url === 'http://127.0.0.1:8000/token/refresh/'){
            config.body = JSON.stringify({
                "refresh": localStorage.getItem('refresh')
            })
        }
        if(typeof(config.body) === "object") {
            config.headers = {}
        }
        return [url, config];
    },

    requestError: function (error) {
        return Promise.reject(error);
    },

    response: function (response) {
        return response;
    },

    responseError: function (error) {
        return Promise.reject(error);
    }
});

