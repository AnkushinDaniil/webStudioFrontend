export type List = {
    id: number,
    title: string,
    description: string
} | null

export type Lists = List[] | null;

export enum ActionTypes {
    SET_LISTS = "SET_LISTS",
    CREATE_LIST = "CREATE_LIST",
    DELETE_LIST = "DELETE_LIST"
  }

export type ListActionType = {
  type: ActionTypes;
  payload: List;
};