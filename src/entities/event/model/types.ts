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