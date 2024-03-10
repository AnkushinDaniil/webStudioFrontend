import moment from "moment"
import { useState, FC } from "react"
import { momentLocalizer, Calendar } from "react-big-calendar"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "react-big-calendar/lib/css/react-big-calendar.css"

type Range = Date[] | {
    start: Date;
    end: Date;
}

type CalendarEvent = {
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean
    resource?: unknown  
}


export const Schedule:FC = () => {
    const {user} = useAuthContext()

    const localizer = momentLocalizer(moment) // or globalizeLocalizer
    const [events, setEvents] = useState<Array<CalendarEvent>>([])

    const onRangeChange =  async (range: Range): Promise<void> => {
        console.log(range)
        
        let start, end : Date
        if (Array.isArray(range)) {
            start = new Date(range[0])
            end = new Date(range[range.length-1])
        } else {
            start = range.start
            end = range.end
        }
        start.setHours(0, 0, 0)
        end.setHours(23, 59, 59)

        console.log(start, end)
        
        const response = await fetch("/api/schedule/", {
            headers : {
                "Authorization": `Bearer ${user!.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "POST",
            body: JSON.stringify({start: start, end: end}),
        })

        const json = (await response.json()).data
        console.log(json)
    
        const newEvents: CalendarEvent[] = []
        
        if (Array.isArray(json)) {
            for (const item of json) {            
                newEvents.push(
                    {
                        title: item.username,
                        start: new Date(item.start),
                        end: new Date(item.end),
                    })
            }
        }
        setEvents(newEvents)
    
    }

    return (
        <div className="myCustomHeight">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                // onSelectEvent={(event: Event) => {console.log(event)}}
                onRangeChange={(range: Range) => {onRangeChange(range)}}
            />
        </div>
    )
}