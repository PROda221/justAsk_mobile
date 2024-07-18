import moment from 'moment';

export function formatTimestamp(timestamp: string) {
  // Create a moment object from the timestamp
  const momentDate = moment(timestamp);

  // Get current date and time for comparison
  const now = moment();

  // 1) Check if the timestamp is today
  if (momentDate.isSame(now, 'day')) {
    return momentDate.format('HH:mm');
  }

  // 2) Check if the timestamp is within this week
  if (momentDate.isSame(now, 'week')) {
    return momentDate.format('ddd');
  }

  // 3) Check if the timestamp is within this year
  if (momentDate.isSame(now, 'year')) {
    return momentDate.format('MMM D');
  }

  // 4) If the timestamp is before this year
  return momentDate.format('MMM D, YYYY');
}
