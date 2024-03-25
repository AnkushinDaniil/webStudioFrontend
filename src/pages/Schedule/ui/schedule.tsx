import { CalendarEvent, RangeStructure } from "entities/calendar"
import { FC, useState } from "react"
import { SlotInfo } from "react-big-calendar"
import ItemCreationForm from "widgets/item/ItemCreationForm"
import { Modal } from "widgets/modal"
import { StudioCalendar } from "widgets/calendar"

export const Schedule:FC = () => {

    const [modal, setModal] = useState<boolean>(false)
    const [create, setCreate] = useState<boolean>(false)
    const [creationRange, setCreationRange] = useState<RangeStructure>()
    const [event, setEvent] = useState<CalendarEvent>({
        id: 0,
        user: "",
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
        done: false,
    } )
    
    const onSelectSlot = (slotInfo: SlotInfo): boolean => {
        setCreationRange({
            start: slotInfo.start,
            end: slotInfo.end
        })
        setCreate(true)
        return false
    }

    if(modal || create) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal")
    }
   
    return (
        <div>
            <StudioCalendar 
                setModal={setModal}
                setEvent={setEvent}
                setCreate={setCreate}
                modal={modal}
                onSelectSlot={onSelectSlot}
            />
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
            {create && (
                <div className="modal">
                    <div onClick={() => {setModal(false)
                        setCreate(false)}} className="overlay"></div>
                    <div className="modal-content">
                        <ItemCreationForm range={creationRange!}/>
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