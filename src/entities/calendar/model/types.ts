export type CalendarEvent = {
    id?: number;
    color?: string;
    user?: string | undefined;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    done?: boolean;
  }

export type RangeArray = Date[] 

export type RangeStructure = {
      start: Date;
      end: Date;
  }
  
export type Range = RangeArray | RangeStructure
  
export type SetBool = React.Dispatch<React.SetStateAction<boolean>>
export type SetEvent = React.Dispatch<React.SetStateAction<CalendarEvent>>