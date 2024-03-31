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
            <div className="navbar">
                <div className="container">
                    <Link to="/">
                        <img className="img" src={"/f.png"}></img>
                    </Link>
                    <Link to="/">главная</Link>
                    <Link to="/">о нас</Link>
                    <Link to="/">наши мастера</Link>
                    <Link to="/">отзывы</Link>
                    <Link to="/">аренда</Link>
            
               
                </div>
                <div className="vl"></div>
                {user && (
                    <div className="container">
                        <div>{user.username}</div>
                        <Link to="/lists">списки</Link>
                        <Link to="/schedule">расписание</Link>
                        <div onClick={handleClick}>выйти</div>
                    </div>
                )}
                {!user && (
                    <div className="container">
                        <Link to="/sign-in">вход</Link>
                        <Link to="/sign-up">регистрация</Link>

                    </div>
                )}
            </div>
        </header>
    )
}
