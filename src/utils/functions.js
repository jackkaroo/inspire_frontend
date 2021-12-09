export const getDate = (dateCreated) => {
  const date1 = new Date(dateCreated);
  const date2 = new Date();

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 2) {
    return Math.ceil(diffTime / (1000 * 60 * 60)) + ' hours ';
  }

  return diffDays + ' days ';
}
