import { ListActionTypes } from "entities/list"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useListsContext } from "shared/hooks/useListsContext"


export const DeleteListButton = (id: number): JSX.Element => {
    const {user} = useAuthContext()
    const {dispatch} = useListsContext()
    const deleteList = async(): Promise<void> => {
        const response = await fetch(`/api/lists/${id}`, {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "DELETE",
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type:ListActionTypes.DELETE_LIST, payload:json})
        }
    }
    return (
        <span onClick={deleteList}>delete</span>
    )
}