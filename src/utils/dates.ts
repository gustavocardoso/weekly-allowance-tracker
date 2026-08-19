import {
  differenceInCalendarDays,
  endOfWeek,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  startOfWeek,
} from 'date-fns';

export function formatDisplayDate(date: Date | number | string, pattern = 'MMM d, yyyy') {
  return format(new Date(date), pattern);
}

export function getWeekRange(date: Date | number | string) {
  const parsedDate = new Date(date);
  return {
    start: startOfWeek(parsedDate, { weekStartsOn: 1 }),
    end: endOfWeek(parsedDate, { weekStartsOn: 1 }),
  };
}

export function formatWeekRange(date: Date | number | string) {
  const { start, end } = getWeekRange(date);
  return `${format(start, 'MMM d')} – ${format(end, 'MMM d')}`;
}

export function formatRelativeDate(date: Date | number | string) {
  const parsedDate = new Date(date);

  if (isToday(parsedDate)) {
    return 'Today';
  }

  if (isYesterday(parsedDate)) {
    return 'Yesterday';
  }

  const daysAway = differenceInCalendarDays(parsedDate, new Date());

  if (Math.abs(daysAway) < 7) {
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  return format(parsedDate, 'MMM d, yyyy');
}
