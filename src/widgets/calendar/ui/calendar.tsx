import { useState, useEffect, useCallback, useMemo } from "react"
import { Calendar, Views, View, SlotInfo } from "react-big-calendar"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "./calendar.css"
import { CalendarEvent, SetBool, SetEvent, Range, fetchSchedule, getRange, localizer, messages, studioFormats } from "entities/calendar"
import { useItemsContext } from "shared/hooks/useItemsContext"
import "moment/locale/ru"
import { useLogout } from "shared/hooks/useLogout"
import hexToRgba from "hex-to-rgba"

export const StudioCalendar = ({
    setModal, 
    setEvent, 
    setCreate,
    modal, 
    onSelectSlot
}: {setModal: SetBool, 
    setEvent: SetEvent,
    setCreate: SetBool,
    modal: boolean, 
    onSelectSlot: (slotInfo: SlotInfo) => boolean
}): JSX.Element => {
    const {user} = useAuthContext()
    const { logout } = useLogout()
    const [events, setEvents] = useState<Array<CalendarEvent>>([])
    const [date, setDate] = useState<Date>(new Date())
    const [view, setView] = useState<View>(Views.MONTH)
    const [range, setRange] = useState<Range>(getRange(date, view))
    const {items, dispatch} = useItemsContext()

    useEffect((): void => {
        if (user) {
            fetchSchedule(getRange(date, view), dispatch, user, logout)
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
                    backgroundColor: `${hexToRgba(event.color!, "0.8")}`,
                },
            }
        }),
        []
    )
 
    const dayPropGetter = useCallback(
        (date: Date) => ({
            ...(date < new Date() && {
                style: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                },
            }),
        }),
        []
    )
    
    const slotPropGetter = useCallback(
        (date:Date) => ({
            className: "slotDefault",
            ...((date.getHours() < 8 || date.getHours() > 22) && {
                style: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    color: "black",
                },
            }),
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
                selectable = {true}
                onSelectSlot={onSelectSlot}
                onRangeChange={onRangeChange}
                defaultView={view}
                onView={onView}
                onNavigate={onNavigate}
                eventPropGetter={eventPropGetter}
                dayPropGetter={dayPropGetter}
                slotPropGetter={slotPropGetter}
                messages={messages}
            />
        </div>
    )
}

