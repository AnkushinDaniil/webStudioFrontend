import { Item, ItemCell } from "entities/item"
import { DeleteItemButton } from "features/delete-item"


const ItemDetails = ({item}: {item: Item}): JSX.Element => {
    return (
        <ItemCell item={item} deleteButton={DeleteItemButton(item!.id)} />
    )
}

export default ItemDetails