import { ActionTypes, List } from "entities/list"
import ListDetails from "features/list/ListDetails"
import ListForm from "features/list/ListForm"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useListsContext } from "shared/hooks/useListsContext"
import { useEffect, type ReactElement } from "react"


export const ListPage = (): ReactElement => {
    const {user} = useAuthContext()
    const {lists, dispatch} = useListsContext()

    useEffect(():void => {
        const fetchLists = async (): Promise<void> => {
            const response = await fetch("/api/lists", {
                headers : {
                    "Authorization": `Bearer ${user!.token}`
                },
            })

            const json = await response.json()            
            
            if (response.ok) {
                dispatch({type: ActionTypes.SET_LISTS, payload: json.data})
            }
        }

        if (user) {
            fetchLists()
        }
    }, [ lists, user, dispatch])    

    return (
        <div className="home">
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