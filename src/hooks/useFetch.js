import {useEffect, useState, useCallback} from "react";

export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
        setResponse(null)
    }, [])

    useEffect(() => {

        if (!isLoading) {
            return
        }

        const requestOptions = {
            ...options,
            ...{
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        // console.log(requestOptions);
        fetch(baseUrl + url, requestOptions)
            .then(response => response.json())
            .then(res => {
                setResponse(res)
                setIsLoading(false)
            })
            .catch(response => {
                setIsLoading(false)
                setError(response)
            });

    }, [isLoading, url, options])

    return [{isLoading, response, error}, doFetch]
}
