import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSighIn = (): {
  signIn: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: null;
} => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signIn = async (username: string, password: string): Promise<void> => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/auth/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({username, password }),
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else {
            localStorage.setItem("user", JSON.stringify(json))
            dispatch!({ type: "LOGIN", payload: json })
            setIsLoading(false)
        }
    }

    return { signIn, isLoading, error }
}