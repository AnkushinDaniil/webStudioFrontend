
import { FC } from "react"
import { useAuthContext } from "shared/hooks/useAuthContext"
import "./home.css"


export const Home: FC = () => {
    const {user} = useAuthContext()

    return (
        <div className="home" >
            {user?.token && (
                <div className="home-container">
                    <div>мы тату студия делаем татулировки вот</div>
                    <div>наши мастера самые лучшие вот</div>
                    <div>отзывы такие: "в этой студии лучшие мастера делают лучшие татулировки!!!"</div>
                    <div>аренда дорого</div>
                </div>
            )}
        </div>
    )
}