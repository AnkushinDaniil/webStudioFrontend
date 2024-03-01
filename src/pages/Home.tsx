import { type ReactElement } from "react"
// import { useState, useEffect } from "react"
// import UserList from "../entities/ListsList"

const Home = (): ReactElement => {
    // const [users, setUsers] = useState([
    //     { name: "name1", username: "username1", password: "password1", id: 1 },
    //     { name: "name2", username: "username2", password: "password2", id: 2 },
    //     { name: "name3", username: "username3", password: "password3", id: 3 }
    // ])

    // const [name, setName] = useState("mario")

    // const handleDelete = (id: number): void => {
    //     setUsers(users.filter((blog): boolean => { return blog.id !== id }))
    // }

    // useEffect((): void => {
    //     console.log("useEffect ran")
    // }, [name])

    return (
        <div className="home">
            {/* <UserList lists={lists} title="All lists" handleDelete={handleDelete} /> */}
            {/* <button onClick={(): void => { setName("luigi") }}>change name</button> */}
            {/* <p>{name}</p> */}
        </div>
    )
}

export default Home


// import { useEffect }from "react"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// // components
// import WorkoutDetails from "../components/WorkoutDetails"
// import WorkoutForm from "../components/WorkoutForm"

// const Home = () => {
//     const {workouts, dispatch} = useWorkoutsContext()

//     useEffect(() => {
//         const fetchWorkouts = async () => {
//             const response = await fetch("/api/workouts")
//             const json = await response.json()

//             if (response.ok) {
//                 dispatch({type: "SET_WORKOUTS", payload: json})
//             }
//         }

//         fetchWorkouts()
//     }, [dispatch])

//     return (
//         <div className="home">
//             <div className="workouts">
//                 {workouts && workouts.map((workout) => (
//                     <WorkoutDetails key={workout._id} workout={workout} />
//                 ))}
//             </div>
//             <WorkoutForm />
//         </div>
//     )
// }

// export default Home