export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
