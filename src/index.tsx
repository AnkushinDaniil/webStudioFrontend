import React from "react"
import ReactDOM from "react-dom/client"
import "../src/app/index.css"
import { AuthContextProvider } from "./shared/context/AuthContext"
import { ListContextProvider } from "./shared/context/ListContext"
import App from "App"
import { ItemContextProvider } from "shared/context/ItemContext"

const root = ReactDOM.createRoot(
  document.getElementById("root")!
)
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <ListContextProvider>
                <ItemContextProvider>
                    <App />
                </ItemContextProvider>
            </ListContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals