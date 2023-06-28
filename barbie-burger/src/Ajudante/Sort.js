export const Sort = (data) => {
  const copyData = [...data];
  return copyData.sort((a, b) => a.id- b.id);
};