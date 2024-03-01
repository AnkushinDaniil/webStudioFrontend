import { useEffect, type ReactElement, useState } from "react"
import TimeslotsList from "../entities/TimeslotList"
import { useAuthContext } from "../hooks/useAuthContext"
import ListDetails from "../components/ListDetails"
import ListForm from "../components/ListForm"

const Home = (): ReactElement => {
    const [lists, setLists] = useState<TimeslotsList[]|null>(null)
    const {user, dispatch} = useAuthContext()

    useEffect(():void => {
        const fetchLists = async (): Promise<void> => {
            const response = await fetch("/api/lists", {
                headers : {
                    "Authorization": `Bearer ${user!.token}`
                },
            })

            const json = await response.json()
            
            if (response.ok) {
                setLists(json.data)
            }
        }

        if (user) {
            fetchLists()
        }
    }, [user, dispatch])

    return (
        <div className="home">
            {user?.token && (
                <div className="lists">
                    {lists && lists.map((list:TimeslotsList) => (
                        <ListDetails key={list.id} list={list}/>
                    ))}
                </div>)}
            {user?.token && (
                <ListForm />
            )}
        </div>
    )
}

export default Home

