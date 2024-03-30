import { useEffect, useState } from "react"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "./ItemWidget.css"
import Select from "react-select"
import { useListsContext } from "shared/hooks/useListsContext"
import moment from "moment"
import { listsToOptions, validateRange } from "./lib"
import { fetchLists } from "entities/list"
import { useLogout } from "shared/hooks/useLogout"

type RangeStructure = {
    start: Date;
    end: Date;
}

export const ItemForm = (
    {
        range, 
        defaultTitle, 
        defaultDescription,  
        defaultDone, 
        defaultListId,
        handleSubmitGenerator,
        isEdit,
    }: {
        range:RangeStructure,
        defaultTitle:string,
        defaultDescription: string,
        defaultDone: boolean,
        defaultListId: number|null,
        handleSubmitGenerator: (title: string, description: string, start: Date, end: Date, done: boolean, listId?: number) => (e: {
            preventDefault: () => void;
        }) => Promise<void>,
        isEdit: boolean,
    }): JSX.Element => {
    const [title, setTitle] = useState(defaultTitle)
    const [isTitleEmpty, setIsTitleEmpty] = useState(true)
    const [description, setDescription] = useState(defaultDescription)
    const [start, setStart] = useState<Date>(range!.start)
    const [end, setEnd] = useState<Date>(range!.end)
    const now = new Date()
    const startSchedule = new Date()
    startSchedule.setFullYear(range.start.getFullYear())
    startSchedule.setMonth(range.start.getMonth())
    startSchedule.setDate(range.start.getDate())
    startSchedule.setHours(8, 0, 0, 0)
    const endSchedule = new Date()
    endSchedule.setFullYear(range.end.getFullYear())
    endSchedule.setMonth(range.end.getMonth())
    endSchedule.setDate(range.end.getDate())
    endSchedule.setHours(23, 0, 0, 0)

    const [done, setDone] = useState<boolean>(defaultDone)
    const [error, setError] = useState<string|null>(null)
    const [id, setId] = useState<number|null>(defaultListId)
    
    const {lists, dispatch} = useListsContext()
    const {user} = useAuthContext()
    const { logout } = useLogout()

    useEffect(():void => {
        if (user) {
            fetchLists(user, dispatch, logout)
        }
    }, [ user, dispatch, logout])   

    useEffect(():void => {
        if (user) {
            setId(Array.isArray(lists)? lists[0]!.id : null)
        }
    }, [ lists, user ]) 
    
    useEffect(():void => {
        if (title == "" != isTitleEmpty) {
            setIsTitleEmpty(!isTitleEmpty)
        }
    }, [ title ]) 

    useEffect(():void => {
        const validation = async (): Promise<void> => {
            setError(await validateRange(start, end, user!))
            console.log(error)
            
            if (error == null) {
                if (isTitleEmpty) {
                    setError("Пожалуйста, напишите название") 
                } else if (start > end || start < now || start.getHours() < 8 || start.getHours() >= 23) {
                    setError("Пожалуйста, проверьте правильность заполнения даты и времени")
                } else if (id === null) {
                    setError("Пожалуйста, выберете список")
                } else {
                    setError(null)
                }
            }
        }
        validation()
    }, [ start, end, id, isTitleEmpty, user ])   


    const handleSubmit = handleSubmitGenerator(title, description, start, end, done, id!)
    
    return (
        <form className="container" onSubmit={handleSubmit}>
            <h3>Add a new item</h3>
            <label>Title:</label>
            <input 
                type="text"
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                value={title}
            />
            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <div className="datetime">
                <label>Start:</label>
                <DateTimePicker 
                    onChange={(e) => ( setStart(e!.toDate()))}
                    defaultValue={moment(start)}
                    disablePast
                    minDateTime={moment(start).clone().startOf("day").add(8, "hours")}
                />
            </div>
            <div className="datetime">
                <label>End:</label>
                <DateTimePicker 
                    onChange={(e) => ( setEnd(e!.toDate()))}
                    defaultValue={moment(end)}
                    disablePast
                    minTime={moment.max(moment(start), moment(start).clone().startOf("day").add(8, "hours"))}
                    maxTime={moment(start).clone().startOf("day").add(23, "hours")}
                />
            </div>

            <label>Done:</label>
            <input 
                type="checkbox"
                onChange={() => setDone(!done)}
                checked={done}
            />
            {!isEdit && (<div>
                <label>List:</label>
                {Array.isArray(lists) && (
                    <Select 
                        options={listsToOptions(lists)!} 
                        defaultValue={listsToOptions(lists)![0]}
                        onChange={(selectedOption) => setId(selectedOption!.value!)}
                    />
                )}
            </div>)}
            {(error === null) && (<button>Ok</button>)}
            
            {error && <div className="error">{error}</div>}
        </form>
    )
}