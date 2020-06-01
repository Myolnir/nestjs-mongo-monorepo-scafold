export const parseSort = (
  sort: string,
): { property: string; direction: 'DESC' | 'ASC' } => {
  const direction: 'ASC' | 'DESC' = /^-/.test(sort) ? 'DESC' : 'ASC';
  const property: string = direction === 'DESC' ? sort.replace('-', '') : sort;
  return { direction, property };
};
