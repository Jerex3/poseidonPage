import React, { createContext, useState } from 'react'

const Context = createContext()

const Provider = ({ children }) => {
    
    const [isAuth, setIsAuth] = useState(true)
    const [isSendEmail, setIsSendEmail] = useState(false)
    const [isSettings, setIsSettings] = useState(false);

    const value = {
        isAuth,
        activateAuth: () => {
            setIsAuth(true)
        },
        logOut: () => {
            setIsAuth(false)
        },
        isSendEmail,
        activateEmail: () => {
            setIsSendEmail(true)
        },
        desactivateEmail: () => {
            setIsSendEmail(false)
        },
        setEmailFalse: () => {
            setIsSendEmail(false)
        },
        isSettings,
        toggleSettings: () => {
            setIsSettings(!isSettings)
        }
    }

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>

    )
}

export default {
    Provider,
    Consumer: Context.Consumer
}