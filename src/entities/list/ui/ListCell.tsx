import { FC, ReactElement } from "react"
import { List } from "../model/types"
import { Link } from "react-router-dom"
import "./ListCell.css"

interface ListCellProps {
    list: List,
    deleteButton: ReactElement,
    // listRedirect: VoidFunction
}

export const ListCell :FC<ListCellProps> = ({list, deleteButton}) => {
    return (
        <div className="list-cell">
            <Link to={{
                pathname: `/lists/${list?.id}/items`,
            }}>{list?.title}</Link>
            <p>{list?.description}</p>
            {deleteButton}
        </div>
    )
}