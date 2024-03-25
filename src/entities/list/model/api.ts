import { User } from "entities/user"
import { ListActionType, ListActionTypes } from "./types"

export const fetchLists = async (user: User, listDispatch:React.Dispatch<ListActionType>): Promise<void> => {
    const response = await fetch("/api/lists/", {
        headers : {
            "Authorization": `Bearer ${user!.token}`
        },
    })

    const json = await response.json()            
    
    if (response.ok) {
        listDispatch({type: ListActionTypes.SET_LISTS, payload: json.data})
    }
}
