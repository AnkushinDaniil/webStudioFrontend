import { ListContext } from "../context/ListContext"
import { useContext } from "react"
import TimeslotsList from "../entities/TimeslotList"

interface IDispatch  {
  ( arg1?: {type: string,  payload?: Promise<unknown>}): void
}

export const useListsContext = (): {
  lists?: Array<TimeslotsList>;
  dispatch?: IDispatch;
} => {
    const context = useContext(ListContext)

    if (context == null) {
        throw Error("useListsContext must be used inside an ListContextProvider")
    }

    return context
}
