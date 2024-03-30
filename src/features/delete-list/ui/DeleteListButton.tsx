import { fetchDeleteList } from "entities/list"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useListsContext } from "shared/hooks/useListsContext"
import { useLogout } from "shared/hooks/useLogout"


export const DeleteListButton = (id: number): JSX.Element => {
    const {user} = useAuthContext()
    const {dispatch} = useListsContext()
    const {logout} = useLogout()
    const deleteList = async(): Promise<void> => {
        fetchDeleteList(id, user!, dispatch, logout)
    }
    return (
        <span onClick={deleteList}>delete</span>
    )
}