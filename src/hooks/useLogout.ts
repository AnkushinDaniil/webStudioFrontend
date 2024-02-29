import { useAuthContext } from "./useAuthContext"
export const useLogout = (): {
  logout: () => void;
} => {
    const { dispatch } = useAuthContext()

    const logout = (): void => {
        localStorage.removeItem("user")

    dispatch!({ type: "LOGOUT" })
    }

    return { logout }
}