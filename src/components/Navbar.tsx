// import { type ReactElement } from 'react'
// import React from 'react'

// const Navbar = (): ReactElement => {
//   return (
//       <nav className="navbar">
//           <h1>The studio</h1>
//           <div className="links">
//               <a href='/'>Home</a>
//               <a href='/sigh-up' >Sign up</a>
//               <a href='/sigh-in' >Sign-</a>
//           </div>
//         </nav>
//   )
// }

// export default Navbar
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = (): JSX.Element => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    return (
        <header>
            <nav className="navbar">
                <Link to="/">
                    <h1>The studio</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user!.username}</span>
                            <button onClick={() => {logout()}}>Log out</button>
                        </div>
                    )}
                    {!user &&(
                        <div>
                            <Link to="/sign-in">Sign in</Link>
                            <Link to="/sign-up">Sign up</Link>
                        </div>
                    )}
                </nav>
            </nav>
        </header>
    )
}

export default Navbar
