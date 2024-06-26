import { Item, ItemActionTypes } from "entities/item"
import { ReactElement, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import ItemCreationForm from "widgets/item/ItemCreationForm"
import "./list-page.css"
import ItemDetails from "widgets/item/ItemDetails"
import { useLogout } from "shared/hooks/useLogout"



export const ListPage = (): ReactElement => {
    const {user} = useAuthContext()
    const {id} = useParams()
    const {items, dispatch} = useItemsContext()
    const { logout } = useLogout()

    useEffect(():void => {
        const fetchLists = async (): Promise<void> => {
            const response = await fetch(`/api/lists/${id}/items`, {
                headers : {
                    "Authorization": `Bearer ${user!.token}`
                },
            })            

            const json = await response.json()              

            if (response.ok) {
                dispatch({type: ItemActionTypes.SET_ITEMS, payload: json.data})
            } else if (response.status == 401) {
                location.href = "/"
                logout()
            }
        }

        if (user) {
            fetchLists()
        }
    }, [ id, user, dispatch])    

    return (
        <div className="list-page">
            {user?.token && (
                <div className="lists">
                    {items && items.map((item:Item) => (
                        <ItemDetails key={item!.id} item={item!}/>
                    ))}
                </div>)}
            {user?.token && (
                <ItemCreationForm range={{
                    start: new Date(),
                    end: new Date()
                }}/>
            )}
        </div>
    )
}