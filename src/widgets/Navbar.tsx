import { type ReactElement } from 'react'

const Navbar = (): ReactElement => {
  return (
      <nav className="navbar">
          <h1>The studio blog</h1>
          <div className="links">
              <a href='/'>Home</a>
              <a href='/create' >New blog</a>
          </div>
        </nav>
  )
}

export default Navbar
