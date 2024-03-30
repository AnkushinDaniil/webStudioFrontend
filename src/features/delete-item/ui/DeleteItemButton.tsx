import { fetchDeleteItem } from "entities/item"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import { useLogout } from "shared/hooks/useLogout"


export const DeleteItemButton = ({id}: {id:number}): JSX.Element => {
    const {user} = useAuthContext()
    const {dispatch} = useItemsContext()
    const {logout} = useLogout()
    const deleteItem = async(): Promise<void> => {
        await fetchDeleteItem(id, user!, dispatch, logout)
    }
    return (
        <button className="delete-button" onClick={deleteItem}>delete</button>
    )
}