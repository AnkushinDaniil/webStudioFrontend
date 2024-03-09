import { ActionTypes } from "entities/list"
import { useAuthContext } from "shared/hooks/useAuthContext"
import { useListsContext } from "shared/hooks/useListsContext"
import { useState } from "react"

const ListForm = (): JSX.Element => {
    const {dispatch} = useListsContext()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)

    const {user} = useAuthContext()


    const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
        e.preventDefault()

        const list = {title, description}
        const response = await fetch("/api/lists", {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "POST",
            body: JSON.stringify(list),
        })

        const json = await response.json()
            
        if (!response.ok) {
            setError(json.message)
        } else {
            setTitle("")
            setDescription("")
            setError(null)
            console.log("New list was added", json)
            dispatch!({
                type: ActionTypes.CREATE_LIST, 
                payload: {
                    id: +json.id,
                    title: title,
                    description: description
                } })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new list</h3>
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
            <button>Add list</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ListForm