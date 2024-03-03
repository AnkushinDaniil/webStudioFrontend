import { useContext } from "react"
import { CurrentListContextType, ListContext } from "../context/ListContext"


export const useListsContext = (): CurrentListContextType => {
    const context = useContext(ListContext)

    if (context == null) {
        throw Error("useListsContext must be used inside an ListContextProvider")
    }

    return context
}
