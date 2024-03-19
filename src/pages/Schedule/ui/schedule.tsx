import moment from "moment"
import { useState, FC, useEffect, useCallback } from "react"
import { momentLocalizer, Calendar, Views, View } from "react-big-calendar"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "./schedule.css"
import { Modal } from "widgets/modal"
import { CalendarEvent } from "entities/event"
import { ItemActionTypes } from "entities/item"
import { useItemsContext } from "shared/hooks/useItemsContext"

type Range = Date[] | {
    start: Date;
    end: Date;
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
    const [modal, setModal] = useState<boolean>(false)
    const [event, setEvent] = useState<CalendarEvent>({
        id: 0,
        user: "",
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
        done: false,
    } )
    const {items, dispatch} = useItemsContext()

    useEffect((): void => {
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
                dispatch({type: ItemActionTypes.SET_ITEMS, payload: json})
            }
        }

        if (user) {
            fetchSchedule()
        }        
    }, [ user, date, view, range, dispatch])

    useEffect(():void => {
        const newEvents:CalendarEvent[] = []
        if (Array.isArray(items)) {            
            for (const item of items!) {
                newEvents.push({
                    id: item!.id,
                    color: item!.color,
                    user: item!.user,
                    title: item!.title!,
                    description: item!.description,
                    start: item!.start!,
                    end: item!.end!,
                    done: item!.done,
                })
            }}        

        setEvents(newEvents)
        setModal(false)
    }, [items])
    
    const toggleModal = useCallback((event: CalendarEvent):void => {
        setModal(!modal)      
        setEvent(event) 
    }, [setModal, setEvent, modal])

    const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
    const onRangeChange = useCallback((newRange: Range) => setRange(newRange), [setRange])
    const onView = useCallback((newView: View) => setView(newView), [setView])
    const onSelectEvent = useCallback((item: CalendarEvent) => toggleModal(item), [toggleModal])
    const eventPropGetter = useCallback(
        (event: CalendarEvent) => ({
            ...{
                style: {
                    backgroundColor: `#${event.color}`,
                },
            }
        }),
        []
    )

    if(modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal")
    }
   
    return (
        <div>
            <div className="myCustomHeight">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={onSelectEvent}
                    onRangeChange={(range: Range) => {onRangeChange(range)}}
                    defaultView={view}
                    onView={onView}
                    onNavigate={onNavigate}
                    eventPropGetter={eventPropGetter}
                />
            </div>
            {modal && (
                <div className="modal">
                    <div onClick={() => setModal(false)} className="overlay"></div>
                    <div className="modal-content">
                        <Modal event={event} />
                        <div className="container">
                            <button className="close-modal" onClick={() => setModal(false)}>
                                {"❌"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}