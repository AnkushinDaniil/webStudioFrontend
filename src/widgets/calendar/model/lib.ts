import moment from "moment"
import { View } from "react-big-calendar"
import { Range } from "./types"

export const getRange = (date: Date, view: View): Range => {
    let start, end
    // if view is day: from moment(date).startOf('day') to moment(date).endOf('day');
    if(view === "day"){
        start = moment(date).startOf("day")
        end   = moment(date).endOf("day")
    }
    // if view is week: from moment(date).startOf('isoWeek') to moment(date).endOf('isoWeek');
    else if(view === "week"){
        start = moment(date).startOf("isoWeek")
        end   = moment(date).endOf("isoWeek")
    }
    //if view is month: from moment(date).startOf('month').subtract(7, 'days') to moment(date).endOf('month').add(7, 'days'); i do additional 7 days math because you can see adjacent weeks on month view (that is the way how i generate my recurrent events for the Big Calendar, but if you need only start-end of month - just remove that math);
    else if(view === "month"){
        start = moment(date).startOf("month").subtract(7, "days")
        end   = moment(date).endOf("month").add(7, "days")
    }
    // if view is agenda: from moment(date).startOf('day') to moment(date).endOf('day').add(1, 'month');
    else if(view === "agenda"){
        start = moment(date).startOf("day")
        end   = moment(date).endOf("day").add(1, "month")
    }

    return {
        start: start!.toDate(),
        end: end!.toDate(),
    }
}