import { useNavigate } from "react-router-dom"

export const RedirectList = (id: number): () => void => {
    const navigate = useNavigate()  
    const routeChange = (): void =>{ 
        const path = `lists/${id}`
        navigate(path)
    }

    return routeChange
}