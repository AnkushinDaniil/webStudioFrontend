import { FC } from "react"
import { Item } from "../model/types"
import "./itemCell.css"
import { DeleteItemButton } from "features/delete-item"
import { useAuthContext } from "shared/hooks/useAuthContext"


interface ItemCellProps {
    item: Item,
}

export const ItemCell :FC<ItemCellProps> = ({item}) => {  
    const {user} = useAuthContext()  
    
    return (
        <div className="item-cell">
            <div className="container">
                <h4>{item?.title}</h4>
                <p>{item?.description}</p>
            </div>
            <div className="container">
                <label>Master:</label>
                <p>{item?.user}</p>
            </div>
            <div className="container">
                <label>Start:</label>
                <p>{item?.start.toLocaleDateString()}</p>
                <p>{item?.start.toLocaleTimeString()}</p>
            </div>
            <div className="container">
                <label>End:</label>
                <p>{item?.end.toLocaleDateString()}</p>
                <p>{item?.end.toLocaleTimeString()}</p>
            </div>
            <div className="container">
                <label>Done:</label>
                <p>{item?.done? "✓" : "Х"}</p>
            </div>
            {user?.username == item?.user && (
                <div className="container">
                    <DeleteItemButton id={item!.id!}/>
                    <button>edit</button>
                </div>
            )}
        </div>
    )
}