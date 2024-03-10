export type Item = {
    id: number,
    title: string,
    description: string,
    start: string,
    end: string,
    done: boolean
} | null

export type Items = Item[] | null;

export enum ItemActionTypes {
    SET_ITEMS = "SET_ITEMS",
    CREATE_ITEM = "CREATE_ITEM",
    DELETE_ITEM = "DELETE_ITEM"
  }

export type ItemActionType = {
  type: ItemActionTypes;
  payload: Item;
};