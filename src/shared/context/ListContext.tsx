import { Dispatch, ReactNode, createContext, useReducer } from "react"
import { Lists, List, ListActionType, ListActionTypes } from "entities/list"

export type State = {
  lists: Lists|List|null;
};

export interface CurrentListContextType {
  lists: Lists;
  dispatch: Dispatch<ListActionType>;
}

export const ListContext = createContext<CurrentListContextType|null>(null)

export const listReducer = (state: State, action: ListActionType): State => {
    const { type, payload } = action
    const lists = []
    switch (type) {
    case ListActionTypes.SET_LISTS:
        return {
            lists: payload,
        }
    case ListActionTypes.CREATE_LIST:   
        return { lists: Array.isArray(state.lists)? 
            ([...state.lists, payload]) :
            [payload]}
    case ListActionTypes.DELETE_LIST:
        return {
            lists: Array.isArray(state.lists)? state.lists.filter((list: List):boolean => list?.id !== payload?.id) : []}
    case ListActionTypes.EDIT_LIST:
        if (Array.isArray(state.lists)) {
            for (const item of state.lists) {
                if (item!.id == payload?.id) {
                    lists.push(payload)
                } else {
                    lists.push(item)
                }
            }
        }
        return {
            lists: lists,
        }
    default:
        return state
    }
}

export const ListContextProvider = ({
    children,
}: {
  children: ReactNode;
}): JSX.Element => {
    const [state, dispatch] = useReducer(listReducer, { lists: null })
    
    return (
        <ListContext.Provider value={{ lists: Array.isArray(state.lists)? 
            (state.lists) : null, dispatch }}>
            {children}
        </ListContext.Provider>
    )
}