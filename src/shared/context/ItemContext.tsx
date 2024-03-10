import { Items, Item, ItemActionTypes, ItemActionType } from "entities/item"
import { Dispatch, createContext, ReactNode, useReducer } from "react"


export type State = {
  items: Items|Item|null;
};

export interface CurrentItemContextType {
  items: Items;
  dispatch: Dispatch<ItemActionType>;
}

export const ItemContext = createContext<CurrentItemContextType|null>(null)

export const itemReducer = (state: State, action: ItemActionType): State => {
    const { type, payload } = action
    switch (type) {
    case ItemActionTypes.SET_ITEMS:
        return {
            items: payload,
        }
    case ItemActionTypes.CREATE_ITEM:   
        return { items: Array.isArray(state.items)? 
            ([...state.items, payload]) :
            [payload]}
    case ItemActionTypes.DELETE_ITEM:
        return {
            items: Array.isArray(state.items)? state.items.filter((item: Item):boolean => item?.id !== payload?.id) : []}
    default:
        return state
    }
}

export const ItemContextProvider = ({
    children,
}: {
  children: ReactNode;
}): JSX.Element => {
    const [state, dispatch] = useReducer(itemReducer, { items: null })
    
    return (
        <ItemContext.Provider value={{ items: Array.isArray(state.items)? 
            (state.items) : null, dispatch }}>
            {children}
        </ItemContext.Provider>
    )
}