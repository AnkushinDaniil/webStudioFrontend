
import { useSighUp } from "shared/hooks/useSighUp"
import React, { useState } from "react"
import "./sign-up.css"
import { hsvaToHex } from "@uiw/color-convert"
import { ColorPicker } from "entities/color"


export const SignUp: React.FC = () => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 })
    const {signUp, error, isLoading} = useSighUp()

    const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
        e.preventDefault()

        await signUp(name, hsvaToHex(hsva), username, password)
    }

    return (
        <form className="signUp" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Name:</label>
            <input
                type="name"
                onChange={(e) => { setName(e.target.value) }}
                value={name}
            />
            <label>Username:</label>
            <input
                type="username"
                onChange={(e) => { setUsername(e.target.value) }}
                value={username}
            />
            <label>Color:</label>
            <ColorPicker hsva={hsva} setHsva={setHsva}/>
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error"></div>}
        </form>
    )
}
