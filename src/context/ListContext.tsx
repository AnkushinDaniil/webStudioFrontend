import { Dispatch, ReactNode, createContext, useReducer } from "react"
import { ITimeslotsList } from "../entities/TimeslotList"

export enum ActionTypes {
  SET_LISTS = "SET_LISTS",
  CREATE_LIST = "CREATE_LIST",
  DELETE_LIST = "DELETE_LIST"
}

export type List = ITimeslotsList | null;
export type Lists = List[] | null;

type ListActionType = {
  type: ActionTypes;
  payload: List;
};

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
    switch (type) {
    case ActionTypes.SET_LISTS:
        return {
            lists: payload,
        }
    case ActionTypes.CREATE_LIST:   
        return { lists: Array.isArray(state.lists)? 
            ([...state.lists, payload]) :
            [payload]}
    case ActionTypes.DELETE_LIST:
        return {
            lists: Array.isArray(state.lists)? state.lists.filter((list: List):boolean => list?.id !== payload?.id) : []}
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
