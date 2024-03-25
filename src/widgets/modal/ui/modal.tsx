import { useAuthContext } from "shared/hooks/useAuthContext"
import "./modal.css"
import { CalendarEvent } from "entities/calendar"
import { ItemCell } from "entities/item"

export const Modal = ({event}: {event: CalendarEvent}): JSX.Element => {
    const {user} = useAuthContext()  

    const item = {
        id: event.id!,
        user: event.user!,
        title: event.title,
        description: event.description!,
        start: event.start,
        end: event.end,
        done: event.done!
    }
    
    return (
        <div>
            {user?.token && (
                <div>
                    <ItemCell item={item}/>
                </div>)}
        </div>
    )
}