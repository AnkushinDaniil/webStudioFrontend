import { type ReactElement } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import SignUp from "../pages/SignUp"
import SignIn from "../pages/SighIn"

function App (): ReactElement {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/sign-in"
                            element={<SignIn />}
                        />
                        <Route
                            path="/sign-up"
                            element={<SignUp />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
