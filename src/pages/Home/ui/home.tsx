
import { FC } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "./home.css"


export const Home: FC = () => {
    const {user} = useAuthContext()

    return (
        <div className="home" >
            {user?.token && (
                <div>
                    <Link className="list-details" to="/lists">Lists</Link>
                    <Link className="list-details" to="/schedule">Schedule</Link>
                </div>
            )}
        </div>
    )
}