import { DateLocalizer, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { RangeStructure } from "entities/calendar"

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

export const messages = {
    next: "Следующий",
    previous: "Предыдущий",
    today: "Сегодня",
    month: "Месяц",
    week: "Неделя",
    day: "День",
    agenda: "Повестка дня"
}

moment.locale("ru", {
    week: {
        dow: 1,
        doy: 1,
    },
})

export const localizer = momentLocalizer(moment)