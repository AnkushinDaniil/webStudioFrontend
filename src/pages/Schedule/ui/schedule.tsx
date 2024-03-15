import moment from "moment"
import { useState, FC, useEffect, useCallback } from "react"
import { momentLocalizer, Calendar, Views, View } from "react-big-calendar"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./schedule.css"

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

const getRange = (date: Date, view: View): Range => {
    let start, end
    // if view is day: from moment(date).startOf('day') to moment(date).endOf('day');
    if(view === "day"){
        start = moment(date).startOf("day")
        end   = moment(date).endOf("day")
    }
    // if view is week: from moment(date).startOf('isoWeek') to moment(date).endOf('isoWeek');
    else if(view === "week"){
        start = moment(date).startOf("isoWeek")
        end   = moment(date).endOf("isoWeek")
    }
    //if view is month: from moment(date).startOf('month').subtract(7, 'days') to moment(date).endOf('month').add(7, 'days'); i do additional 7 days math because you can see adjacent weeks on month view (that is the way how i generate my recurrent events for the Big Calendar, but if you need only start-end of month - just remove that math);
    else if(view === "month"){
        start = moment(date).startOf("month").subtract(7, "days")
        end   = moment(date).endOf("month").add(7, "days")
    }
    // if view is agenda: from moment(date).startOf('day') to moment(date).endOf('day').add(1, 'month');
    else if(view === "agenda"){
        start = moment(date).startOf("day")
        end   = moment(date).endOf("day").add(1, "month")
    }

    return {
        start: start!.toDate(),
        end: end!.toDate(),
    }
}

export const Schedule:FC = () => {
    const {user} = useAuthContext()

    const localizer = momentLocalizer(moment) // or globalizeLocalizer
    const [events, setEvents] = useState<Array<CalendarEvent>>([])
    const [date, setDate] = useState<Date>(new Date())
    const [view, setView] = useState<View>(Views.MONTH)
    const [range, setRange] = useState<Range>(getRange(date, view))

    useEffect(():void => {
        const fetchSchedule = async (): Promise<void> => {
            let start, end
            if (Array.isArray(range)) {
                start = new Date(range[0])
                end = new Date(range[range.length-1])
            } else {
                start = range.start
                end = range.end
            }
            start.setHours(0, 0, 0)
            end.setHours(23, 59, 59)
            
            const response = await fetch(`/api/schedule?start=${start.toISOString()}&end=${end.toISOString()}`, {
                headers : {
                    "Authorization": `Bearer ${user?.token}`,
                    "Content-Type": "application/json; charset=utf-8"
                },
                method: "GET",
            })
    
            const json = (await response.json()).data
        
            if (response.ok) {
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
        }

        if (user) {
            fetchSchedule()
        }
    }, [ user, date, view, range])    

    const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
    const onRangeChange = useCallback((newRange: Range) => setRange(newRange), [setRange])
    const onView = useCallback((newView: View) => setView(newView), [setView])


    return (
        <div className="myCustomHeight">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                // onSelectEvent={(event: Event) => {console.log(event)}}
                onRangeChange={(range: Range) => {onRangeChange(range)}}
                defaultView={view}
                onView={onView}
                onNavigate={onNavigate}
            />
        </div>
    )
}