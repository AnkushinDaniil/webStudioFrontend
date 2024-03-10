
import { Link } from "react-router-dom"
import { useAuthContext } from "shared/hooks/useAuthContext"


export const Home: React.FC = () => {
    const {user} = useAuthContext()

    return (
        <div className="home">
            {user?.token && (
                <div>
                    <Link className="list-details" to="/lists">Lists</Link>
                </div>
            )}
        </div>
    )
}