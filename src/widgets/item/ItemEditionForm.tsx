import { useState } from "react"
import DateTimePicker from "react-datetime-picker"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"
import { Item, ItemActionTypes } from "entities/item"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ItemEditionForm = ({item}: {item:Item}): JSX.Element => {
    console.log(item)
    
    const {dispatch} = useItemsContext()
    const [title, setTitle] = useState(item?.title)
    const [description, setDescription] = useState(item?.description)
    const [start, setStart] = useState<Value>(item!.start!)
    const [end, setEnd] = useState<Value>(item!.end!)
    const [done, setDone] = useState(item?.done)
    const [error, setError] = useState(null)

    const {user} = useAuthContext()

    interface Diff {
        [key: string]: unknown
    }

    const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
        e.preventDefault()

        const newItem = {title, description, start, end, done}
        
        const diff: Diff = {}
        let prop: keyof typeof newItem
        for (prop in newItem) {
            if (newItem[prop] != item![prop]) {
                diff[prop] = newItem[prop]
            }
        }

        const response = await fetch(`/api/items/${item?.id}`, {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "PUT",
            body: JSON.stringify(diff),
        })

        const json = await response.json()
            
        if (!response.ok) {
            setError(json.message)
        } else {
            setError(null)
            console.log("Item was edited", json)
            dispatch({
                type: ItemActionTypes.EDIT_ITEMS, 
                payload: {
                    id: item!.id!,
                    user: item!.user,
                    color: item!.color,
                    title: title!,
                    description: description!,
                    start: new Date(start!.toString()),
                    end: new Date(end!.toString()),
                    done: done!
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
            <button>Edit item</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ItemEditionForm