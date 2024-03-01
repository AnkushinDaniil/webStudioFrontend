import TimeslotsList from "../entities/TimeslotList"

const ListDetails = ({list}: {list: TimeslotsList}): JSX.Element => {
    return (
        <div className="list-details">
            <h4>{list.title}</h4>
            <p>{list.description}</p>
        </div>
    )
}

export default ListDetails