import { useAuthContext } from "shared/hooks/useAuthContext"
import { useLogout } from "shared/hooks/useLogout"
import { Link } from "react-router-dom"
import "./navbar.css"


export const Navbar: React.FC = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = (): void => {
        location.href = "/"
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>frisson.tattoo</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.username}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user?.token && (
                        <div>
                            <Link to="/sign-in">Sign in</Link>
                            <Link to="/sign-up">Sign up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
