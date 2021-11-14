export const compareDaysWithNow = (date) => {
  const dateAsMs = new Date(date).getTime();
  const todayAsMs = new Date().getTime();
  const timeDiff = todayAsMs - dateAsMs;

  const hoursDiff = Math.round(timeDiff / (3600 * 1000));
  const daysDiff = Math.round(hoursDiff / 24);
  const monthsDiff = Math.round(daysDiff / 30);
  const yearsDiff = Math.round(monthsDiff / 12);

  if (hoursDiff === 0) {
    return "A few minutes ago";
  } else if (daysDiff === 0) {
    return `${hoursDiff} hour ago`;
  } else if (daysDiff > 0 && daysDiff <= 31) {
    return `${daysDiff} days ago`;
  } else if (monthsDiff > 1 && monthsDiff <= 12) {
    return `${monthsDiff} months ago`;
  } else if (yearsDiff === 1) {
    return `1 year ago`;
  } else {
    return `${yearsDiff} year(s) ago`;
  }
};
