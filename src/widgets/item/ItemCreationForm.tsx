import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "./ItemWidget.css"
import { ItemActionTypes } from "entities/item"
import { ItemForm } from "./ItemForm"

type RangeStructure = {
    start: Date;
    end: Date;
}

const ItemCreationForm = ({range}: {range:RangeStructure}): JSX.Element => {
    const {dispatch: dispatchItems} = useItemsContext()

    const {user} = useAuthContext()

    const handleSubmitGenerator = (
        title: string, 
        description: string, 
        start: Date, 
        end: Date, 
        done: boolean,
        listId?: number,
    ) => {return async (
        e: { preventDefault: () => void }, 
    ): Promise<void> => {
        e.preventDefault()

        const item = {title, description, start, end, done}
        const response = await fetch(`/api/lists/${listId}/items`, {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "POST",
            body: JSON.stringify(item),
        })

        const json = await response.json()
            
        if (!response.ok) {
            console.log(json.message)
        } else {
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
    } }
    

    return (
        <ItemForm 
            range = {range}
            defaultTitle = {""}
            defaultDescription = {""}
            defaultDone = {false}
            defaultListId = {null}
            handleSubmitGenerator = {handleSubmitGenerator}
            isEdit = {false}
        />
    )
}

export default ItemCreationForm