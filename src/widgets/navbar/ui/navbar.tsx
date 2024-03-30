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
                    <img className="img" src={"/f.png"}></img>
                </Link>
                <div>главная</div>
                <div>о нас</div>
                <div>наши мастера</div>
                <div>отзывы</div>
                <div>аренда</div>
            
                {user && (
                    <div>{user.username}</div>
                )}
                {user && (
                    <div onClick={handleClick}>Log out</div>
                )}
                {!user?.token && (
                    <Link to="/sign-in">вход</Link>
                )}
                {!user?.token && (
                    <Link to="/sign-up">регистрация</Link>
                )}
            </div>
        </header>
    )
}
