
import { useSighIn } from "shared/hooks/useSighIn"
import { useState } from "react"
import "./sigh-in.css"

export const SignIn: React.FC = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signIn, error, isLoading} = useSighIn()

    const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
        e.preventDefault()

        await signIn(username, password)
        setUsername("")
        setPassword("")
    }

    return (
        <form className="signIn" onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <label>Username:</label>
            <input
                type="username"
                onChange={(e) => { setUsername(e.target.value) }}
                value={username}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
            />

            <button disabled={isLoading}>Sign in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
