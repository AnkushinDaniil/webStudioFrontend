import { useAuthContext } from "shared/hooks/useAuthContext"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "./ItemWidget.css"
import { Item, fetchCreateItem } from "entities/item"
import { ItemForm } from "./ItemForm"
import { useLogout } from "shared/hooks/useLogout"

type RangeStructure = {
    start: Date;
    end: Date;
}

const ItemCreationForm = ({range}: {range:RangeStructure}): JSX.Element => {
    const {dispatch: dispatchItems} = useItemsContext()
    const {user} = useAuthContext()
    const {logout} = useLogout()

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

        const item: Item = {
            title: title,
            description: description, 
            start: start,
            end:end, 
            done: done
        }
        await fetchCreateItem(listId!, item, user!, dispatchItems, logout)
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