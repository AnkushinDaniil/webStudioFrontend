import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "./ItemWidget.css"
import { Item, ItemActionTypes } from "entities/item"
import { ItemForm } from "./ItemForm"

interface Diff {
    [key: string]: unknown
}


const ItemEditionForm = ({item}: {item:Item}): JSX.Element => {
    const {dispatch: dispatchItems} = useItemsContext()
    const {user} = useAuthContext()

    const handleSubmitGenerator = (
        title: string, 
        description: string, 
        start: Date, 
        end: Date, 
        done: boolean,
    ) => {return async (e: { preventDefault: () => void }): Promise<void> => {
        e.preventDefault()
    
        const newItem = {title, description, start, end, done}
            
        const diff: Diff = {}
        let prop: keyof typeof newItem
        for (prop in newItem) {
            if (newItem[prop] != item![prop]) {
                diff[prop] = newItem[prop]
            }
        }
    
        const response = await fetch(`/api/items/${item!.id}`, {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "PUT",
            body: JSON.stringify(diff),
        })
    
        const json = await response.json()
                
        if (!response.ok) {
            console.log(json.message)
        } else {
            console.log("Item was edited", json)
            dispatchItems({
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
    
    }}
    

    return (
        <ItemForm 
            range = {{start: item!.start, end: item!.end}}
            defaultTitle = {item!.title}
            defaultDescription = {item!.description}
            defaultDone = {item!.done}
            defaultListId = {item!.id}
            handleSubmitGenerator = {handleSubmitGenerator}
            isEdit = {true}
        />
    )
}

export default ItemEditionForm