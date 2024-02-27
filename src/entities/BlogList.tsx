import { type ReactElement } from 'react'

interface Blog {
  title: string
  author: string
  id: number
}

interface propBlog {
  blogs: Blog[]
  title: string
}

const BlogList = ({ blogs, title }: propBlog): ReactElement => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
             {blogs.map((blog) => (
              <div className="blog-preview" key={blog.id}>
                  <h2>{blog.title}</h2>
                  <p>Whitten by {blog.author}</p>
            </div>
             ))}
        </div>
  )
}

export default BlogList
