import { ItemActionType, ItemActionTypes } from "entities/item"
import { User } from "entities/user"
import { Range } from "./types"

export const fetchSchedule = async (
    range:  Range, 
    dispatch: (value: ItemActionType) => void, 
    user: User | undefined
): Promise<void> => {
    let start, end
    if (Array.isArray(range)) {
        start = new Date(range[0])
        end = new Date(range[range.length-1])
    } else {
        start = range.start
        end = range.end
    }
    start.setHours(0, 0, 0)
    end.setHours(23, 59, 59)
    
    const response = await fetch(`/api/schedule?start=${start.toISOString()}&end=${end.toISOString()}`, {
        headers : {
            "Authorization": `Bearer ${user?.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "GET",
    })

    const json = (await response.json()).data                        

    if (response.ok) {
        dispatch({type: ItemActionTypes.SET_ITEMS, payload: json})
    }
}