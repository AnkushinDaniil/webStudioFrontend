import { FC, ReactElement } from "react"
import { Item } from "../model/types"
import "./itemCell.css"

interface ItemCellProps {
    item: Item,
    deleteButton: ReactElement
}

export const ItemCell :FC<ItemCellProps> = ({item, deleteButton}) => {
    return (
        <div className="item-cell">
            <h4>{item?.title}</h4>
            <p>{item?.description}</p>
            <label>Start:</label>
            <p>{new Date(item!.start).toLocaleDateString()}</p>
            <p>{new Date(item!.start).toLocaleTimeString()}</p>
            <label>End:</label>
            <p>{new Date(item!.end).toLocaleDateString()}</p>
            <p>{new Date(item!.end).toLocaleTimeString()}</p>
            {deleteButton}
        </div>
    )
}