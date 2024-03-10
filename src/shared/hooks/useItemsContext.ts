import { useContext } from "react"
import { CurrentItemContextType, ItemContext } from "shared/context/ItemContext"


export const useItemsContext = (): CurrentItemContextType => {
    const context = useContext(ItemContext)

    if (context == null) {
        throw Error("useItemsContext must be used inside an ListContextProvider")
    }

    return context
}