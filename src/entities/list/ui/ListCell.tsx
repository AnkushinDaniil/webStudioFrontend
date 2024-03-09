import { FC, ReactElement } from "react"
import { List } from "../model/types"

interface ListCellProps {
    list: List,
    deleteButton: ReactElement
}

export const ListCell :FC<ListCellProps> = ({list, deleteButton}) => {
    return (
        <div className="list-cell">
            <h4>{list?.title}</h4>
            <p>{list?.description}</p>
            {deleteButton}
        </div>
    )
}