import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

interface IDispatch  {
  ( arg1?: {type: string,  payload?: Promise<unknown>}): void
}

export const useAuthContext = (): { 
  dispatch?: IDispatch, 
  user?: {
    name?: string,
    username?: string,
    password?: string,
    token?: string
  } 
} => {
    const context = useContext(AuthContext)

    if (context == null) {
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }

    return context
}
