export const calculatePaginationData = (page, perPage, total) => {
  const totalPages = Math.ceil(total / perPage);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
