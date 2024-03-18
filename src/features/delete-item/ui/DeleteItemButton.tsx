import { ItemActionTypes } from "entities/item"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"


export const DeleteItemButton = ({id}: {id:number}): JSX.Element => {
    const {user} = useAuthContext()
    const {dispatch} = useItemsContext()
    const deleteItem = async(): Promise<void> => {
        const response = await fetch(`/api/items/${id}`, {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "DELETE",
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type:ItemActionTypes.DELETE_ITEM, payload:json})
        }
    }
    return (
        <button className="delete-button" onClick={deleteItem}>delete</button>
    )
}