import { type ReactElement } from "react"
import React from "react"

interface User {
  name: string
  username: string
  id: number
}

interface propUser {
  users: User[]
  title: string
  handleDelete: (arg0: number) => void
}

const UserList = ({ users, title, handleDelete }: propUser): ReactElement => {
    return (
        <div className="user-list">
            <h2>{title}</h2>
            {users.map((user) => (
                <div className="user-preview" key={user.id}>
                    <p>name {user.name}</p>
                    <p>username {user.username}</p>
                    <button onClick={(): void => { handleDelete(user.id) }}>delete blog</button>
                </div>
            ))}
        </div>
    )
}

export default UserList
