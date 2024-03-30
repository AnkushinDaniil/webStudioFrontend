import { Lists } from "entities/list"
import { User } from "entities/user"

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

type note = {
    time: number,
    type: "start"|"end"
}

export const validateRange = async(start: Date, end: Date, user: User): Promise<string|null> => {
    const s = new Date(start)
    const e = new Date(start)
    s.setHours(0, 0, 0, 0)
    e.setHours(23, 59, 59, 59)
    const response = await fetch(`/api/schedule?start=${s.toISOString()}&end=${e.toISOString()}`, {
        headers : {
            "Authorization": `Bearer ${user?.token}`,
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "GET",
    })

    const json = (await response.json()).data                        

    if (response.ok) {
        const notes:note[] = []
        if (Array.isArray(json)) {
            for (const item of json) {
                notes.push(
                    {
                        time: Date.parse(item.start),
                        type: "start"
                    }
                )
                notes.push(
                    {
                        time: Date.parse(item.end),
                        type: "end"
                    }
                )
            }
            notes.push(
                {
                    time: start.valueOf(),
                    type: "start"
                }
            )
            notes.push(
                {
                    time: end.valueOf(),
                    type: "end"
                }
            )
            notes.sort((a: note, b: note) => {return a.time-b.time})
        
            let counter = 0
            for (const note of notes) {
                if (note.type == "start") {
                    counter++
                } else {
                    counter--
                }
                if (counter > 4) {
                    return "К сожалению, в выбранное время все места заняты"
                }
            }
        }
        return null
    } else {
        return "Ошибка подключения"
    }
}