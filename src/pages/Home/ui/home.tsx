
import { Link } from "react-router-dom"
import { useAuthContext } from "shared/hooks/useAuthContext"


export const Home: React.FC = () => {
    const {user} = useAuthContext()
    // const {lists, dispatch} = useListsContext()

    // useEffect(():void => {
    //     const fetchLists = async (): Promise<void> => {
    //         const response = await fetch("/api/lists", {
    //             headers : {
    //                 "Authorization": `Bearer ${user!.token}`
    //             },
    //         })

    //         const json = await response.json()            
            
    //         if (response.ok) {
    //             dispatch({type: ActionTypes.SET_LISTS, payload: json.data})
    //         }
    //     }

    //     if (user) {
    //         fetchLists()
    //     }
    // }, [ lists, user, dispatch])    

    return (
        <div className="home">
            {user?.token && (
                <div>
                    <Link to="/lists">Lists</Link>
                </div>
            )}
        </div>
    )
}