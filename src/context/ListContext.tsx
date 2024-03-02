import { ReactNode, createContext, useReducer } from "react"
import TimeslotsList from "../entities/TimeslotList"

export enum ActionTypes {
    SET_LISTS = "SET_LISTS",
    CREATE_LIST = "CREATE_LIST"
}

type List = TimeslotsList|null
type Lists = List[]|null

type ListActionType = {
    type: ActionTypes,
    payload: List
}

export type State = {
lists: Lists,
}


export const ListContext = createContext<unknown>(null)


export const listReducer = (state: State, action: ListActionType):State => {
    const { type, payload } = action
    switch (type) {
    case "SET_LISTS":
        return {
            lists: Array.isArray(payload) ? payload:[payload]
        }
    case "CREATE_LIST":
        return {lists: [...(state.lists ?? []), payload]}
    default:
        return state
    }
}

export const ListContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [state, dispatch] = useReducer(listReducer, {lists:null})

    return (
        <ListContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ListContext.Provider>
    )
}

