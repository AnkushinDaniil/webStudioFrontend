import { ListActionTypes, List } from "entities/list"
import { ReactElement, useEffect } from "react"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useListsContext } from "shared/hooks/useListsContext"
import ListDetails from "widgets/list/ListDetails"
import ListForm from "widgets/list/ListForm"
import "./lists-page.css"
import { useLogout } from "shared/hooks/useLogout"



export const ListsPage = (): ReactElement => {
    const {user} = useAuthContext()
    const {lists, dispatch} = useListsContext()
    const { logout } = useLogout()

    useEffect(():void => {
        const fetchLists = async (): Promise<void> => {
            const response = await fetch("/api/lists/", {
                headers : {
                    "Authorization": `Bearer ${user!.token}`
                },
            })

            const json = await response.json()            
            
            if (response.ok) {
                dispatch({type: ListActionTypes.SET_LISTS, payload: json.data})
            } else if (response.status == 401) {
                location.href = "/"
                logout()
            }
        }

        if (user) {
            fetchLists()
        }
    }, [ lists, user, dispatch])    

    return (
        <div className="list-page">
            {user?.token && (
                <div className="lists">
                    {lists && lists.map((list:List) => (
                        <ListDetails key={list!.id} list={list!}/>
                    ))}
                </div>)}
            {user?.token && (
                <ListForm />
            )}
        </div>
    )
}