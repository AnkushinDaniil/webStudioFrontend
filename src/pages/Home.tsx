import { useEffect, type ReactElement } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import ListDetails from "../components/ListDetails"
import ListForm from "../components/ListForm"
import { useListsContext } from "../hooks/useListsContext"
import { ActionTypes, List } from "../context/ListContext"

const Home = (): ReactElement => {
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
                dispatch!({type: ActionTypes.SET_LISTS, payload: json.data})
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

export default Home

