import { type ReactElement } from 'react'
import Navbar from '../../widgets/Navbar'
import Home from './Home'

function App (): ReactElement {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home />
      </div>
    </div>
  )
}

export default App
