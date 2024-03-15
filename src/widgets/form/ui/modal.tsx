import "./modal.css"

export const Modal = ({id}: {id: number}): JSX.Element => {

    return (
        <div>
            <h2>Event id:</h2>
            <p>{id}</p>

        </div>
    )
}