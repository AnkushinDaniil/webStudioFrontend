import { ItemActionType, ItemActionTypes } from "entities/item"
import { User } from "entities/user"
import { Range } from "entities/calendar"

export const fetchSchedule = async (
    range:  Range, 
    dispatch: (value: ItemActionType) => void, 
    user: User | undefined,
    logout: () => void
): Promise<void> => {
    
    let start, end
    if (Array.isArray(range)) {
        start = new Date(range[0])
        end = new Date(range[range.length-1])
    } else {
        start = range.start
        end = range.end
    }
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    const url = `/api/schedule?start=${start.toISOString()}&end=${end.toISOString()}`
    
    const response = await fetch(url, {
        headers : {
            "Authorization": `Bearer ${user?.token}`,
        },
    })

    const json = (await response.json()).data                        

    if (response.ok) {
        dispatch({type: ItemActionTypes.SET_ITEMS, payload: json})
    } else if (response.status == 401) {
        location.href = "/"
        logout()
    }
}