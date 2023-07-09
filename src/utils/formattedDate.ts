export const formattedDate = (date: string) => {
  const currentDate = new Date();
  const entryDate = new Date(date);
  const timeDiff = Math.abs(currentDate.getTime() - entryDate.getTime());
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};
