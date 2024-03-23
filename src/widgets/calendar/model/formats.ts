import { DateLocalizer } from "react-big-calendar"
import { RangeStructure } from "./types"

export const studioFormats = {
    dateFormat: "D",
    weekdayFormat: (date:Date, culture:string|undefined, localizer:DateLocalizer|undefined): string =>
                localizer!.format(date, "dddd", culture),
    dayFormat: (date:Date, culture:string|undefined, localizer:DateLocalizer|undefined): string =>
                localizer!.format(date, "dddd Do", culture),
    timeGutterFormat: (date:Date, culture:string|undefined, localizer:DateLocalizer|undefined): string =>
                localizer!.format(date, "HH:mm", culture),
    agendaTimeFormat: (date:Date, culture:string|undefined, localizer:DateLocalizer|undefined): string =>
                localizer!.format(date, "HH:mm", culture),
    agendaTimeRangeFormat: ({ start, end }: RangeStructure, culture:string|undefined, localizer:DateLocalizer|undefined): string =>
                localizer!.format(start, "HH:mm", culture) +
                " - " +
                localizer!.format(end, "HH:mm", culture),
}
