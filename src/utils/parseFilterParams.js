const parseContactType = (type) => {
  const allowedTypes = ['personal', 'home'];
  if (typeof type !== 'string') return;
  return allowedTypes.includes(type) ? type : undefined;
};
const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;
  if (isFavourite === 'false') return false;
  if (isFavourite === 'true') return true;
  return;
};
export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
