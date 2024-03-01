// import { ReactNode, createContext, useReducer } from "react"
// import TimeslotsList from "../entities/ListsList"

// export const TimeslotListContext = createContext<unknown>(null)

// interface IState {
//   lists: TimeslotsList[];
// }

// interface IAction {
//   type: string;
//   payload: { _id: number };
// }

// export const listsReducer = (state: IState, action: IAction): unknown => {
//     switch (action.type) {
//     case "SET_LIST":
//         return {
//             lists: action.payload,
//         }
//     case "CREATE_LIST":
//         return {
//             lists: [action.payload, ...state.lists],
//         }
//     case "DELETE_LIST":
//         return {
//             lists: state.lists!.filter((list: { id?: number }): void => {
//                 list.id !== action.payload._id
//             }),
//         }
//     default:
//         return state
//     }
// }

// export const ListsContextProvider = ({
//     children,
// }: {
//   children: ReactNode;
// }): JSX.Element => {
//     const [state, dispatch] = useReducer(listsReducer, {
//         lists: null,
//     })

//     return (
//         <TimeslotListContext.Provider value={{ ...state as object, dispatch }}>
//             {children}
//         </TimeslotListContext.Provider>
//     )
// }
