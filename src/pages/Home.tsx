import { type ReactElement } from "react"
import { useState, useEffect } from "react"
import UserList from "../entities/BlogList"

const Home = (): ReactElement => {
    const [users, setUsers] = useState([
        { name: "name1", username: "username1", password: "password1", id: 1 },
        { name: "name2", username: "username2", password: "password2", id: 2 },
        { name: "name3", username: "username3", password: "password3", id: 3 }
    ])

    const [name, setName] = useState("mario")

    const handleDelete = (id: number): void => {
        setUsers(users.filter((blog): boolean => { return blog.id !== id }))
    }

    useEffect((): void => {
        console.log("useEffect ran")
    }, [name])

    return (
        <div className="home">
            <UserList users={users} title="All users" handleDelete={handleDelete} />
            <button onClick={(): void => { setName("luigi") }}>change name</button>
            <p>{name}</p>
        </div>
    )
}

export default Home
