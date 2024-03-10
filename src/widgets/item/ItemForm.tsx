import { useState } from "react"
import DateTimePicker from "react-datetime-picker"
import { useParams } from "react-router-dom"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"
import { ItemActionTypes } from "entities/item"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ItemForm = (): JSX.Element => {
    const {dispatch} = useItemsContext()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [start, setStart] = useState<Value>(new Date())
    const [end, setEnd] = useState<Value>(new Date())
    const [done, setDone] = useState(false)
    const [error, setError] = useState(null)

    const {user} = useAuthContext()
    const {id} = useParams()


    const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
        e.preventDefault()

        const item = {title, description, start, end, done}
        console.log(start)
        
        
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
            console.log("New item was added", json)
            dispatch!({
                type: ItemActionTypes.CREATE_ITEM, 
                payload: {
                    id: +json.id,
                    title: title,
                    description: description,
                    start: new Date(start!.toString()).toISOString(),
                    end: new Date(end!.toString()).toISOString(),
                    done: done
                }}
            )
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
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
            <div className="container">
                <label>Start:</label>
                <DateTimePicker 
                    onChange={setStart}
                    value={start}
                />
            </div>
            <div className="container">
                <label>End:</label>
                <DateTimePicker 
                    onChange={setEnd}
                    value={end}
                />
            </div>
            <div>
                <label>Done:</label>
                <input 
                    type="checkbox"
                    onChange={() => setDone(!done)}
                    checked={done}
                />
            </div>
            <button>Add item</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ItemForm