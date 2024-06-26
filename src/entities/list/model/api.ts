import { User } from "entities/user"
import { List, ListActionType, ListActionTypes } from "./types"

export const fetchLists = async (user: User, listDispatch:React.Dispatch<ListActionType>, logout: () => void): Promise<void> => {
    const response = await fetch("/api/lists/", {
        headers : {
            "Authorization": `Bearer ${user!.token}`
        },
    })

    const json = await response.json()            
    
    if (response.ok) {
        listDispatch({type: ListActionTypes.SET_LISTS, payload: json.data})
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}

export const fetchDeleteList = async(
    listId: number,
    user: User,
    dispatch: (value: ListActionType) => void,
    logout: () => void
): Promise<void> => {
    const response = await fetch(`/api/lists/${listId}`, {
        headers : {
            "Authorization": `Bearer ${user!.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "DELETE",
    })
    
    if (response.ok) {
        dispatch({type:ListActionTypes.DELETE_LIST, payload:{
            id:listId, 
            title: "", 
            description: "", 
        }})
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}

export const fetchCreateList = async(
    list: List,
    user: User,
    dispatch: (value: ListActionType) => void,
    logout: () => void
): Promise<void> => {
    const response = await fetch("/api/lists/", {
        headers : {
            "Authorization": `Bearer ${user!.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify(list),
    })

    const json = await response.json()
        
    if (response.ok) {
        dispatch({
            type: ListActionTypes.CREATE_LIST, 
            payload: {
                id: +json.id,
                title: list!.title,
                description: list!.description,
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

export const fetchEditList = async(
    user: User,
    listId: number,
    diff: Diff,
    dispatch: (value: ListActionType) => void,
    logout: () => void
): Promise<void> => {
    const response = await fetch(`/api/lists/${listId}`, {
        headers : {
            "Authorization": `Bearer ${user!.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "PUT",
        body: JSON.stringify(diff),
    })

    const json = await response.json()
            
    if (response.ok) {
        console.log("List was edited", json)
        dispatch({
            type: ListActionTypes.EDIT_LIST, 
            payload: {
                id: listId,
                title: json.title,
                description: json.description,
            }}
        )
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}