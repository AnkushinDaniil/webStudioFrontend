import { Item, ItemCell } from "entities/item"


const ItemDetails = ({item}: {item: Item}): JSX.Element => {
    return (
        <ItemCell item={item} />
    )
}

export default ItemDetails