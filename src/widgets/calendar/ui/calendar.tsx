import moment from "moment"
import { useState, useEffect, useCallback, useMemo } from "react"
import { momentLocalizer, Calendar, Views, View, SlotInfo } from "react-big-calendar"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "./calendar.css"
import { CalendarEvent } from "entities/event"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "moment/locale/ru"
import {Range} from "../model/types"
import { getRange } from "../model/lib"
import { studioFormats } from "../model/formats"
import { fetchSchedule } from "../model/api"


export const StudioCalendar = ({
    setModal, 
    setEvent, 
    setCreate,
    modal, 
    onSelectSlot
}: {setModal: React.Dispatch<React.SetStateAction<boolean>>, 
    setEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>,
    setCreate: React.Dispatch<React.SetStateAction<boolean>>,
    modal: boolean, 
    onSelectSlot: (slotInfo: SlotInfo) => boolean
}): JSX.Element => {
    const {user} = useAuthContext()

    moment.locale("ru", {
        week: {
            dow: 1,
            doy: 1,
        },
    })
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState<Array<CalendarEvent>>([])
    const [date, setDate] = useState<Date>(new Date())
    const [view, setView] = useState<View>(Views.MONTH)
    const [range, setRange] = useState<Range>(getRange(date, view))
    const {items, dispatch} = useItemsContext()

    useEffect((): void => {
        if (user) {
            fetchSchedule(range, dispatch, user)
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
        setCreate(false)
    }, [items, setCreate, setModal])
    
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
    const { formats } = useMemo(
        () => ({
            defaultDate: new Date(),
            formats: studioFormats
        }),
        []
    )
   
    return (
        <div className="myCustomHeight">
            <Calendar
                localizer={localizer}
                formats={formats}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={onSelectEvent}
                selectable
                onSelectSlot={onSelectSlot}
                onRangeChange={onRangeChange}
                defaultView={view}
                onView={onView}
                onNavigate={onNavigate}
                eventPropGetter={eventPropGetter}
                messages={{
                    next: "Следующий",
                    previous: "Предыдущий",
                    today: "Сегодня",
                    month: "Месяц",
                    week: "Неделя",
                    day: "День",
                    agenda: "Повестка дня"
                }}
            />
        </div>
    )
}