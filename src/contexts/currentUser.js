import {createContext, useState} from 'react'
import React from 'react'

export const CurrentUserContext = createContext([{}, p=>{}])

export const CurrentUserProvider = ({children}) => {

    const [state, setState] = useState({
        isLoading: false,
        isLoggedIn: false,
    })

    return (
        <CurrentUserContext.Provider value={[state, setState]}>
            {children}
        </CurrentUserContext.Provider>
    )
}
