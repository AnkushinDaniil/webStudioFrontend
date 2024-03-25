import { Lists } from "entities/list"

export const listsToOptions = (lists:Lists): {
    value: number | undefined;
    label: string | undefined;
}[]|null => {
    const newOptions = []
    if (Array.isArray(lists)) {
        for (const list of lists!) {
            newOptions.push({
                value: list?.id,
                label: list?.title
            })
        }
        return newOptions

    } else {
        return null
    }
}