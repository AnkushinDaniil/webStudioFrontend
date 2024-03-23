import { useEffect, useState } from "react"
import DateTimePicker from "react-datetime-picker"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"
import { ItemActionTypes } from "entities/item"
import Select from "react-select"
import { useListsContext } from "shared/hooks/useListsContext"
import { ListActionTypes } from "entities/list"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type RangeStructure = {
    start: Date;
    end: Date;
}

type Option = { 
    value: number | undefined; 
    label: string | undefined; 
}

const ItemCreationForm = ({range}: {range:RangeStructure}): JSX.Element => {
    const {dispatch: dispatchItems} = useItemsContext()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [start, setStart] = useState<Value>(range!.start)
    const [end, setEnd] = useState<Value>(range!.end)
    const [done, setDone] = useState<boolean>(false)
    const [error, setError] = useState(null)
    const [id, setId] = useState<number|null>(null)
    const [options, setOptions] = useState<Array<Option>|null>(null)

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

    const {lists, dispatch} = useListsContext()

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
            }
        }

        if (user) {
            fetchLists()
            const newOptions = []
            if (Array.isArray(lists)) {
                for (const list of lists!) {
                    newOptions.push({
                        value: list?.id,
                        label: list?.title
                    })
                }
            } 

            setOptions(newOptions)
        }
    }, [ lists, user, dispatch])   
    

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
                    value={start!}
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
            <div>
                <label>List:</label>
                <Select options={options!} onChange={(selectedOption) => setId(selectedOption!.value!)}/>
            </div>
            <button>Add item</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ItemCreationForm