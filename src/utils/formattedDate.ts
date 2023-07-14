// export const formattedDate = (date: string) => {
//   const currentDate = new Date();
//   const entryDate = new Date(date);
//   const timeDiff = Math.abs(currentDate.getTime() - entryDate.getTime());
//   const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//   return daysDiff;
// };

export const formattedDate = (date: string) => {
  const baseDate = new Date(date);

  const seconds = Math.floor(
    (new Date().getTime() - baseDate.getTime()) / 1000
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }

  return Math.floor(seconds) + ' seconds';
};
