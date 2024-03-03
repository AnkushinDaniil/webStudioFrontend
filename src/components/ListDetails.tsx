import { ActionTypes } from "../context/ListContext"
import {ITimeslotsList} from "../entities/TimeslotList"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListsContext } from "../hooks/useListsContext"


const ListDetails = ({list}: {list: ITimeslotsList}): JSX.Element => {
    const {user} = useAuthContext()
    const {dispatch} = useListsContext()
    const handleClick = async(): Promise<void> => {
        const response = await fetch(`/api/lists/${list.id}`, {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "DELETE",
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type:ActionTypes.DELETE_LIST, payload:json})
        }
    }
    
    return (
        <div className="list-details">
            <h4>{list.title}</h4>
            <p>{list.description}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default ListDetails