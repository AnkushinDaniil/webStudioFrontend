export type Item = {
    id: number,
    user?: string,
    title: string,
    description: string,
    start: Date,
    end: Date,
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