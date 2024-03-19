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
        
        if (response.ok) {
            dispatch({type:ItemActionTypes.DELETE_ITEM, payload:{
                id:id, 
                title: "", 
                description: "", 
                start: new Date(),
                end: new Date(),
                done: false}})
        }
    }
    return (
        <button className="delete-button" onClick={deleteItem}>delete</button>
    )
}