import { AuthContext } from "shared/context/AuthContext"
import { Dispatch, useContext } from "react"
import { User } from "entities/user"

export const useAuthContext = (): { 
  dispatch?: Dispatch<unknown>, 
  user?: User
} => {
    const context = useContext(AuthContext)

    if (context == null) {
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }

    return context
}