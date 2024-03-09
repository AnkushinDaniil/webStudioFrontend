import { ReactNode, createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext<unknown>(null)

export const authReducer = (state: unknown, action: { type: unknown; payload: unknown }): unknown => {
    switch (action.type) {
    case "LOGIN":
        return { user: action.payload }
    case "LOGOUT":
        return { user: null }
    default:
        return state
    }
}


export const AuthContextProvider = ({ children }: {children: ReactNode}): JSX.Element => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(():void => {
        const user = JSON.parse(localStorage.getItem("user")!)

        if (user) {
            dispatch({type:"LOGIN", payload: user})
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state as object, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}