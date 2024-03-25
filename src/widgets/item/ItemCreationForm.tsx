import { useEffect, useState } from "react"
// import DateTimePicker from "react-datetime-picker"
// import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker"
// import { DateTimeRangePicker } from "@mui/x-date-pickers/DateTimeRangePicker"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "./ItemWidget.css"
import { ItemActionTypes } from "entities/item"
import Select from "react-select"
import { useListsContext } from "shared/hooks/useListsContext"
import moment from "moment"
import { listsToOptions } from "./lib"
import { fetchLists } from "entities/list"

type RangeStructure = {
    start: Date;
    end: Date;
}

const ItemCreationForm = ({range}: {range:RangeStructure}): JSX.Element => {
    const {dispatch: dispatchItems} = useItemsContext()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [start, setStart] = useState<Date>(range!.start)
    const [end, setEnd] = useState<Date>(range!.end)
    // const [pickedRange, setPickedRange] = useState([range.start, range.end])
    const [done, setDone] = useState<boolean>(false)
    const [error, setError] = useState(null)
    const [id, setId] = useState<number|null>(null)
    
    const {lists, dispatch} = useListsContext()
    const {user} = useAuthContext()

    const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
        e.preventDefault()

        const item = {title, description, start, end, done}
        const response = await fetch(`/api/lists/${id}/items`, {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "POST",
            body: JSON.stringify(item),
        })

        const json = await response.json()
            
        if (!response.ok) {
            setError(json.message)
        } else {
            setTitle("")
            setDescription("")
            setStart(new Date())
            setEnd(new Date())
            setDone(false)
            setError(null)
            // console.log("New item was added", json)
            dispatchItems({
                type: ItemActionTypes.CREATE_ITEM, 
                payload: {
                    id: +json.id,
                    title: title,
                    color: json.color,
                    user: user?.username,
                    description: description,
                    start: new Date(start!.toString()),
                    end: new Date(end!.toString()),
                    done: done
                }}
            )
        }
    }

    useEffect(():void => {
        if (user) {
            fetchLists(user, dispatch)
        }
    }, [ user, dispatch])   

    useEffect(():void => {
        if (user) {
            setId(Array.isArray(lists)? lists[0]!.id : null)
        }
    }, [ lists ])   
    

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h3>Add a new item</h3>
            <label>Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <div className="datetime">
                <label>Start:</label>
                <DateTimePicker 
                    onChange={(e) => ( setStart(e!.toDate()))}
                    defaultValue={moment.max(moment(start), moment(start.setHours(8)))}
                    disablePast
                />
            </div>
            <div className="datetime">
                <label>End:</label>
                <DateTimePicker 
                    onChange={(e) => ( setEnd(e!.toDate()))}
                    defaultValue={moment.min(moment(end), moment(end.setHours(23)))}
                    disablePast
                />
            </div>

            <label>Done:</label>
            <input 
                type="checkbox"
                onChange={() => setDone(!done)}
                checked={done}
            />
            <div>
                <label>List:</label>
                {Array.isArray(lists) && (
                    <Select 
                        options={listsToOptions(lists)!} 
                        defaultValue={listsToOptions(lists)![0]}
                        onChange={(selectedOption) => setId(selectedOption!.value!)}
                    />
                )}
            </div>
            <button>Add item</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ItemCreationForm