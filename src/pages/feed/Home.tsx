import { type ReactElement } from 'react'
import { useState } from 'react'
import BlogList from '../../entities/BlogList'

const Home = (): ReactElement => {
  const [blogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ])

  return (
      <div className="home">
          <BlogList blogs={blogs} title="All blogs"/>
      </div>
  )
}

export default Home
