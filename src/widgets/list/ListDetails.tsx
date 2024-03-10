import { List, ListCell } from "entities/list"
import { DeleteListButton } from "features/delete-list/ui/DeleteListButton"

const ListDetails = ({list}: {list: List}): JSX.Element => {
    return (
        <ListCell list={list} deleteButton={DeleteListButton(list!.id)} />
    )
}

export default ListDetails