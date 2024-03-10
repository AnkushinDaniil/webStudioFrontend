import { Home } from "pages/Home"
import { ListPage } from "pages/List"
import { ListsPage } from "pages/Lists"

import {SignIn} from "pages/SighIn"
import {SignUp} from "pages/SighUp"
import { type ReactElement } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "widgets/navbar"

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
                        <Route
                            path="/lists"
                            element={<ListsPage />}
                        />
                        <Route
                            path="/lists/:id/items"
                            element={<ListPage />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App