import { type ReactElement } from "react"

interface TimeslotsList {
  name: string
  username: string
  id: number
}

interface TimeslotsList {
	id :         number   
	title :      string 
	description: string 
}

interface propUser {
  timeslotsLists: TimeslotsList[]
  title: string
  handleDelete: (arg0: number) => void
}

const TimeslotsList = ({ timeslotsLists, title, handleDelete }: propUser): ReactElement => {
    return (
        <div className="user-list">
            <h2>{title}</h2>
            {timeslotsLists.map((timeslotsList) => (
                <div className="user-preview" key={timeslotsList.id}>
                    <p>name {timeslotsList.title}</p>
                    <p>username {timeslotsList.description}</p>
                    <button onClick={(): void => { handleDelete(timeslotsList.id) }}>delete blog</button>
                </div>
            ))}
        </div>
    )
}

export default TimeslotsList
