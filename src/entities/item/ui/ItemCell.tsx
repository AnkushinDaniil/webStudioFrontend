import { FC, useState } from "react"
import { Item } from "../model/types"
import "./itemCell.css"
import { DeleteItemButton } from "features/delete-item"
import { useAuthContext } from "shared/hooks/useAuthContext"
import ItemEditionForm from "widgets/item/ItemEditionForm"


interface ItemCellProps {
    item: Item,
}

export const ItemCell :FC<ItemCellProps> = ({item}) => {  
    const {user} = useAuthContext()  
    const [form, setForm] = useState<boolean>(false)
    const now = new Date()
    
    return (
        <div>
            {form && (<ItemEditionForm item={item} />)}
            {!form && (
                <div className="item-cell">
                    <div className="container">
                        <h4>{item?.title}</h4>
                        <p>{item?.description}</p>
                    </div>
                    <div className="container">
                        <label>Мастер:</label>
                        <p>{item?.user}</p>
                    </div>
                    <div className="container">
                        <label>Начало:</label>
                        <p>{item?.start.toLocaleDateString()}</p>
                        <p>{item?.start.toLocaleTimeString()}</p>
                    </div>
                    <div className="container">
                        <label>Конец:</label>
                        <p>{item?.end.toLocaleDateString()}</p>
                        <p>{item?.end.toLocaleTimeString()}</p>
                    </div>
                    <div className="container">
                        <label>Выполнено:</label>
                        <p>{item?.done? "✓" : "Х"}</p>
                    </div>
                    {(user!.username == item!.user && item!.end > now) && (
                        <div className="container">
                            <DeleteItemButton id={item!.id!}/>
                            <button onClick={() => setForm(true)}>редактировать</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}