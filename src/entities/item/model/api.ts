import { User } from "entities/user"
import { Item, ItemActionType, ItemActionTypes } from ".."

export const fetchItems = async (user: User, listDispatch:React.Dispatch<ItemActionType>, logout: () => void): Promise<void> => {
    const response = await fetch("/api/Items/", {
        headers : {
            "Authorization": `Bearer ${user!.token}`
        },
    })

    const json = await response.json()            
    
    if (response.ok) {
        listDispatch({type: ItemActionTypes.SET_ITEMS, payload: json.data})
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}

export const fetchDeleteItem = async(
    itemId: number,
    user: User,
    dispatch: (value: ItemActionType) => void,
    logout: () => void
): Promise<void> => {
    const response = await fetch(`/api/items/${itemId}`, {
        headers : {
            "Authorization": `Bearer ${user!.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "DELETE",
    })
    
    if (response.ok) {
        dispatch({type:ItemActionTypes.DELETE_ITEM, payload:{
            id:itemId, 
            title: "", 
            description: "", 
            start: new Date(),
            end: new Date(),
            done: false}})
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}

export const fetchCreateItem = async(
    listId: number,
    item: Item,
    user: User,
    dispatch: (value: ItemActionType) => void,
    logout: () => void
): Promise<void> => {
    const response = await fetch(`/api/lists/${listId}/items`, {
        headers : {
            "Authorization": `Bearer ${user!.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify(item),
    })

    const json = await response.json()
        
    if (response.ok) {
        dispatch({
            type: ItemActionTypes.CREATE_ITEM, 
            payload: {
                id: +json.id,
                title: item!.title,
                color: json.color,
                user: user?.username,
                description: item!.description,
                start: new Date(item!.start!.toString()),
                end: new Date(item!.end!.toString()),
                done: item!.done
            }}
        )
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}

interface Diff {
    [key: string]: unknown
}

export const fetchEditItem = async(
    user: User,
    itemId: number,
    diff: Diff,
    dispatch: (value: ItemActionType) => void,
    logout: () => void
): Promise<void> => {
    const response = await fetch(`/api/items/${itemId}`, {
        headers : {
            "Authorization": `Bearer ${user!.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "PUT",
        body: JSON.stringify(diff),
    })

    const json = await response.json()
            
    if (response.ok) {
        console.log("Item was edited", json)
        dispatch({
            type: ItemActionTypes.EDIT_ITEMS, 
            payload: {
                id: itemId,
                user: user.username,
                color: json.color,
                title: json.title,
                description: json.description,
                start: new Date(json.start.toString()),
                end: new Date(json.end.toString()),
                done: json.done,
            }}
        )
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}